import React, { useState, useEffect } from 'react';
import ImageUploader from './common/ImageUploader';

const ServiceModal = ({ isOpen, onClose, onSave, service, isNew }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    price: '$0.39 Only',
    description: '',
    image: { url: '', publicId: '' },
    className: 'on',
    details: {
      hero: {
        title: '',
        subtitle: '',
        description: '',
        beforeImage: { url: '', publicId: '' },
        afterImage: { url: '', publicId: '' }
      },
      projects: []
    }
  });

  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id || null,
        title: service.title || '',
        price: service.price || '',
        description: service.description || '',
        image: typeof service.image === 'object' ? service.image : { url: service.image || '', publicId: '' },
        className: service.className || 'on',
        details: {
          hero: {
            title: service.details?.hero?.title || '',
            subtitle: service.details?.hero?.subtitle || '',
            description: service.details?.hero?.description || '',
            beforeImage: typeof service.details?.hero?.beforeImage === 'object'
              ? service.details.hero.beforeImage
              : { url: service.details?.hero?.beforeImage || '', publicId: '' },
            afterImage: typeof service.details?.hero?.afterImage === 'object'
              ? service.details.hero.afterImage
              : { url: service.details?.hero?.afterImage || '', publicId: '' }
          },
          projects: Array.isArray(service.details?.projects) ? service.details.projects : []
        }
      });
    } else {
      setFormData({
        id: null,
        title: '',
        price: '$0.39 Only',
        description: '',
        image: { url: '', publicId: '' },
        className: 'on',
        details: {
          hero: {
            title: '',
            subtitle: '',
            description: '',
            beforeImage: { url: '', publicId: '' },
            afterImage: { url: '', publicId: '' }
          },
          projects: []
        }
      });
    }
    setActiveTab('basic');
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHeroChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        hero: {
          ...prev.details.hero,
          [field]: value
        }
      }
    }));
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        projects: [...prev.details.projects, { title: '', image: { url: '', publicId: '' } }]
      }
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setFormData((prev) => {
      const projects = [...prev.details.projects];
      projects[index] = {
        ...projects[index],
        [field]: value
      };
      return {
        ...prev,
        details: {
          ...prev.details,
          projects
        }
      };
    });
  };

  const handleRemoveProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        projects: prev.details.projects.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a service title');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div className="service-modal" onClick={(e) => e.stopPropagation()}>
        <div className="service-modal__header">
          <h2>{isNew ? 'Create New Service' : `Edit Service: ${formData.title}`}</h2>
          <button className="service-modal__close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="service-modal__tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            Hero & Details Banner
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects ({formData.details.projects.length})
          </button>
        </div>

        <form onSubmit={handleSubmit} className="service-modal__form">
          <div className="service-modal__body">
            {activeTab === 'basic' && (
              <div className="tab-content">
                <div className="form-group">
                  <label>Service Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Clipping Path"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Starting Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="e.g. $0.39 Only"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Brief service description..."
                  />
                </div>

                <div className="form-group">
                  <ImageUploader
                    label="Service Thumbnail Image"
                    currentImage={formData.image?.url || formData.image}
                    folder="services/thumbnails"
                    onImageUpload={(url, publicId) => handleChange('image', { url, publicId })}
                  />
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="tab-content">
                <div className="form-group">
                  <label>Hero Title</label>
                  <input
                    type="text"
                    value={formData.details.hero.title}
                    onChange={(e) => handleHeroChange('title', e.target.value)}
                    placeholder="Hero title for service page..."
                  />
                </div>

                <div className="form-group">
                  <label>Hero Subtitle</label>
                  <input
                    type="text"
                    value={formData.details.hero.subtitle}
                    onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                    placeholder="e.g. Professional editing"
                  />
                </div>

                <div className="form-group">
                  <label>Hero Description</label>
                  <textarea
                    rows={4}
                    value={formData.details.hero.description}
                    onChange={(e) => handleHeroChange('description', e.target.value)}
                    placeholder="Hero section description..."
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <ImageUploader
                      label="Before Image"
                      currentImage={formData.details.hero.beforeImage?.url}
                      folder="services/hero"
                      onImageUpload={(url, publicId) =>
                        handleHeroChange('beforeImage', { url, publicId })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <ImageUploader
                      label="After Image"
                      currentImage={formData.details.hero.afterImage?.url}
                      folder="services/hero"
                      onImageUpload={(url, publicId) =>
                        handleHeroChange('afterImage', { url, publicId })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="tab-content">
                <div className="projects-header">
                  <h3>Service Projects</h3>
                  <button type="button" className="btn-secondary" onClick={handleAddProject}>
                    + Add Project
                  </button>
                </div>

                {formData.details.projects.length === 0 ? (
                  <p className="empty-text">No projects added yet. Click &quot;+ Add Project&quot; to add one.</p>
                ) : (
                  formData.details.projects.map((project, idx) => (
                    <div key={idx} className="project-card">
                      <div className="project-card__header">
                        <h4>Project #{idx + 1}</h4>
                        <button
                          type="button"
                          className="btn-danger-sm"
                          onClick={() => handleRemoveProject(idx)}
                        >
                          Delete
                        </button>
                      </div>

                      <div className="form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          value={project.title || ''}
                          onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                          placeholder="Project title..."
                        />
                      </div>

                      <div className="form-group">
                        <ImageUploader
                          label="Project Image"
                          currentImage={project.image?.url || project.image}
                          folder="services/projects"
                          onImageUpload={(url, publicId) =>
                            handleProjectChange(idx, 'image', { url, publicId })
                          }
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="service-modal__footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {isNew ? 'Create Service' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .service-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .service-modal {
          background: #ffffff;
          border-radius: 12px;
          width: 100%;
          max-width: 720px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .service-modal__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
        }

        .service-modal__header h2 {
          font-size: 20px;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
        }

        .service-modal__close-btn {
          background: none;
          border: none;
          font-size: 28px;
          color: #64748b;
          cursor: pointer;
          line-height: 1;
        }

        .service-modal__tabs {
          display: flex;
          gap: 4px;
          padding: 0 24px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .tab-btn {
          padding: 12px 16px;
          border: none;
          background: none;
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .tab-btn:hover {
          color: #2563eb;
        }

        .tab-btn.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
          font-weight: 600;
        }

        .service-modal__form {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }

        .service-modal__body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          margin-bottom: 6px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          color: #0f172a;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .projects-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
        }

        .btn-secondary {
          padding: 8px 14px;
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }

        .empty-text {
          font-size: 14px;
          color: #94a3b8;
          text-align: center;
          padding: 24px 0;
        }

        .project-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .project-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .project-card__header h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .btn-danger-sm {
          padding: 4px 10px;
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }

        .service-modal__footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 24px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .btn-cancel {
          padding: 10px 18px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          color: #475569;
          font-weight: 500;
          cursor: pointer;
        }

        .btn-save {
          padding: 10px 20px;
          background: #2563eb;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ServiceModal;
