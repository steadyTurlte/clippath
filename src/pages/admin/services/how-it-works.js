import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'react-toastify';
import ImageUploader from '@/components/admin/common/ImageUploader';

const HowItWorksEditor = () => {
    const [data, setData] = useState({
        subtitle: '',
        title: '',
        image: { url: '', publicId: '' },
        steps: [],
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/content/how-it-works');
                if (res.ok) {
                    setData(await res.json());
                }
            } catch (error) {
                toast.error('Failed to load data');
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/content/how-it-works', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                toast.success('Saved successfully!');
            } else {
                toast.error('Failed to save data');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
        setSaving(false);
    };

    const handleChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleStepChange = (index, value) => {
        const newSteps = [...data.steps];
        newSteps[index] = value;
        setData(prev => ({ ...prev, steps: newSteps }));
    };

    const addStep = () => {
        setData(prev => ({ ...prev, steps: [...prev.steps, ''] }));
    };

    const removeStep = (index) => {
        setData(prev => ({ ...prev, steps: prev.steps.filter((_, i) => i !== index) }));
    };

    const handleImageUpload = (url, publicId) => {
        setData(prev => ({ ...prev, image: { url, publicId } }))
    }

    if (loading) return <AdminLayout>Loading...</AdminLayout>;

    return (
        <AdminLayout>
            <Head>
                <title>How It Works Editor</title>
            </Head>
            <div className="admin-editor">
                <div className="admin-editor__header">
                    <h1 className="admin-editor__title">How It Works</h1>
                    <button onClick={handleSave} disabled={saving} className="admin-editor__save-button">
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
                <div className="admin-editor__content">
                    <div className="admin-editor__field">
                        <label className="admin-editor__label">Subtitle</label>
                        <input
                            type="text"
                            value={data.subtitle}
                            onChange={e => handleChange('subtitle', e.target.value)}
                            className="admin-editor__input"
                        />
                    </div>
                    <div className="admin-editor__field">
                        <label className="admin-editor__label">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => handleChange('title', e.target.value)}
                            className="admin-editor__input"
                        />
                    </div>
                    <div className="admin-editor__field">
                        <label className="admin-editor__label">Image</label>
                        <ImageUploader
                            onImageUpload={handleImageUpload}
                            folder={`how-it-works`}
                            currentImage={data.image?.url}
                            oldPublicId={data.image?.publicId}
                        />
                    </div>
                    <div className="admin-editor__field">
                        <label className="admin-editor__label">Steps</label>
                        {data.steps.map((step, index) => (
                            <div key={index} className="admin-editor__repeater-item">
                                <input
                                    type="text"
                                    value={step}
                                    onChange={e => handleStepChange(index, e.target.value)}
                                    className="admin-editor__input"
                                />
                                <button onClick={() => removeStep(index)} className="admin-editor__remove-button">Remove</button>
                            </div>
                        ))}
                        <button onClick={addStep} className="admin-editor__add-button">Add Step</button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .admin-editor {
                    max-width: 800px;
                }

                .admin-editor__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .admin-editor__title {
                    font-size: 24px;
                    font-weight: 600;
                    color: #1e293b;
                }

                .admin-editor__save-button {
                    padding: 8px 16px;
                    background-color: #4569e7;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }

                .admin-editor__save-button:disabled {
                    background-color: #94a3b8;
                    cursor: not-allowed;
                }

                .admin-editor__content {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    padding: 24px;
                }

                .admin-editor__field {
                    margin-bottom: 16px;
                }

                .admin-editor__label {
                    display: block;
                    font-size: 14px;
                    font-weight: 500;
                    color: #64748b;
                    margin-bottom: 8px;
                }

                .admin-editor__input,
                .admin-editor__textarea {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    font-size: 14px;
                    transition: border-color 0.2s;
                }

                .admin-editor__input:focus,
                .admin-editor__textarea:focus {
                    outline: none;
                    border-color: #4569e7;
                    box-shadow: 0 0 0 3px rgba(69, 105, 231, 0.1);
                }

                .admin-editor__textarea {
                    resize: vertical;
                    min-height: 100px;
                }

                .admin-editor__repeater-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                    padding: 8px;
                    background-color: #f8fafc;
                    border-radius: 4px;
                }

                .admin-editor__repeater-item .admin-editor__input {
                    margin-bottom: 0;
                }

                .admin-editor__add-button {
                    padding: 6px 12px;
                    background-color: #10b981;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-top: 8px;
                }

                .admin-editor__add-button:hover {
                    background-color: #059669;
                }

                .admin-editor__remove-button {
                    padding: 6px 12px;
                    background-color: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    flex-shrink: 0;
                }

                .admin-editor__remove-button:hover {
                    background-color: #dc2626;
                }
            `}</style>
        </AdminLayout>
    );
};

export default HowItWorksEditor;
