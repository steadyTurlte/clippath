import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'react-toastify';

const ServicesFaqEditor = () => {
    const [data, setData] = useState({
        title: '',
        subtitle: '',
        faqs: [],
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/content/about?section=faq');
                if (res.ok) {
                    const aboutData = await res.json();
                    if (aboutData.faq) {
                        setData(aboutData.faq);
                    }
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
            const res = await fetch('/api/content/about?section=faq', {
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

    const handleFaqChange = (index, field, value) => {
        const newFaqs = [...data.faqs];
        newFaqs[index] = { ...newFaqs[index], [field]: value };
        setData(prev => ({ ...prev, faqs: newFaqs }));
    };

    const addFaq = () => {
        setData(prev => ({
            ...prev,
            faqs: [...prev.faqs, { question: '', answer: '' }]
        }));
    };

    const removeFaq = (index) => {
        setData(prev => ({
            ...prev,
            faqs: prev.faqs.filter((_, i) => i !== index)
        }));
    };

    if (loading) return <AdminLayout>Loading...</AdminLayout>;

    return (
        <AdminLayout>
            <Head>
                <title>Services FAQ Editor</title>
            </Head>
            <div className="admin-editor">
                <div className="admin-editor__header">
                    <h1 className="admin-editor__title">Services FAQ</h1>
                    <button onClick={handleSave} disabled={saving} className="admin-editor__save-button">
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
                <div className="admin-editor__content">
                    <div className="admin-editor__field">
                        <label className="admin-editor__label">Section Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => handleChange('title', e.target.value)}
                            className="admin-editor__input"
                            placeholder="Frequently Asked Questions"
                        />
                    </div>
                    <div className="admin-editor__field">
                        <label className="admin-editor__label">Section Subtitle</label>
                        <input
                            type="text"
                            value={data.subtitle}
                            onChange={e => handleChange('subtitle', e.target.value)}
                            className="admin-editor__input"
                            placeholder="FAQ"
                        />
                    </div>
                    <div className="admin-editor__field">
                        <label className="admin-editor__label">FAQ Items</label>
                        {data.faqs.map((faq, index) => (
                            <div key={index} className="admin-editor__repeater-item-container">
                                <h4>FAQ #{index + 1}</h4>
                                <div className="admin-editor__field">
                                    <label className="admin-editor__label">Question</label>
                                    <input
                                        type="text"
                                        value={faq.question}
                                        onChange={e => handleFaqChange(index, 'question', e.target.value)}
                                        className="admin-editor__input"
                                        placeholder="Enter question"
                                    />
                                </div>
                                <div className="admin-editor__field">
                                    <label className="admin-editor__label">Answer</label>
                                    <textarea
                                        value={faq.answer}
                                        onChange={e => handleFaqChange(index, 'answer', e.target.value)}
                                        className="admin-editor__textarea"
                                        rows="4"
                                        placeholder="Enter answer"
                                    />
                                </div>
                                <button onClick={() => removeFaq(index)} className="admin-editor__remove-button">Remove</button>
                            </div>
                        ))}
                        <button onClick={addFaq} className="admin-editor__add-button">Add FAQ</button>
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

                .admin-editor__repeater-item-container {
                    background-color: #f8fafc;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                    border: 1px solid #e2e8f0;
                }

                .admin-editor__repeater-item-container h4 {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 16px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #e2e8f0;
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

                .admin-editor__add-button {
                    padding: 8px 16px;
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
                    margin-top: 8px;
                }

                .admin-editor__remove-button:hover {
                    background-color: #dc2626;
                }
            `}</style>
        </AdminLayout>
    );
};

export default ServicesFaqEditor;
