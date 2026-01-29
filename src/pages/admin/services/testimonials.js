import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '@/components/admin/AdminLayout';
import Head from 'next/head';
import ImageUploader from '@/components/admin/common/ImageUploader';

const TestimonialsEditor = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content/testimonials');
        if (res.ok) {
          const data = await res.json();
          // Handle both array and object with items property
          const items = Array.isArray(data) ? data : (data.items || []);
          setTestimonials(items);
        } else {
          toast.error('Failed to load testimonials');
        }
      } catch (error) {
        toast.error('An error occurred while fetching data');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: testimonials }),
      });
      if (res.ok) {
        toast.success('Testimonials saved successfully!');
      } else {
        toast.error('Failed to save testimonials');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    }
    setSaving(false);
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index][field] = value;
    setTestimonials(newTestimonials);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, {
      id: Date.now(),
      name: '',
      role: '',
      company: '',
      content: '',
      rating: 5,
      image: { url: '', publicId: '' }
    }]);
  };

  const removeTestimonial = (index) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const handleImageUpload = (index, url, publicId) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index].image = { url, publicId };
    setTestimonials(newTestimonials);
  }

  if (loading) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <Head>
        <title>Testimonials Editor</title>
      </Head>
      <div className="admin-editor">
        <div className="admin-editor__header">
          <h1 className="admin-editor__title">Client Testimonials</h1>
          <button onClick={handleSave} disabled={saving} className="admin-editor__save-button">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
        <div className="admin-editor__content">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="admin-editor__repeater-item-container">
              <h4>Testimonial #{index + 1}</h4>
              <div className="admin-editor__field">
                <label className="admin-editor__label">Name</label>
                <input
                  type="text"
                  value={testimonial.name}
                  onChange={e => handleTestimonialChange(index, 'name', e.target.value)}
                  className="admin-editor__input"
                  placeholder="Enter client name"
                />
              </div>
              <div className="admin-editor__field">
                <label className="admin-editor__label">Role/Position</label>
                <input
                  type="text"
                  value={testimonial.role || testimonial.position}
                  onChange={e => handleTestimonialChange(index, 'role', e.target.value)}
                  className="admin-editor__input"
                  placeholder="Enter job title"
                />
              </div>
              <div className="admin-editor__field">
                <label className="admin-editor__label">Company</label>
                <input
                  type="text"
                  value={testimonial.company}
                  onChange={e => handleTestimonialChange(index, 'company', e.target.value)}
                  className="admin-editor__input"
                  placeholder="Enter company name"
                />
              </div>
              <div className="admin-editor__field">
                <label className="admin-editor__label">Testimonial Content</label>
                <textarea
                  value={testimonial.content || testimonial.text}
                  onChange={e => handleTestimonialChange(index, 'content', e.target.value)}
                  className="admin-editor__textarea"
                  rows="4"
                  placeholder="Enter testimonial content"
                />
              </div>
              <div className="admin-editor__field">
                <label className="admin-editor__label">Rating</label>
                <select
                  value={testimonial.rating || 5}
                  onChange={e => handleTestimonialChange(index, 'rating', parseInt(e.target.value))}
                  className="admin-editor__input"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className="admin-editor__field">
                <label className="admin-editor__label">Author Image</label>
                <ImageUploader
                  onImageUpload={(url, publicId) => handleImageUpload(index, url, publicId)}
                  folder={`testimonials`}
                  currentImage={testimonial.image?.url}
                  oldPublicId={testimonial.image?.publicId}
                />
              </div>
              <button onClick={() => removeTestimonial(index)} className="admin-editor__remove-button">Remove</button>
            </div>
          ))}
          <button onClick={addTestimonial} className="admin-editor__add-button">Add Testimonial</button>
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

export default TestimonialsEditor;
