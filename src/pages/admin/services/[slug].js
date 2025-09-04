import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/common/ImageUploader';
import { toast } from 'react-toastify';

const ServiceDetailEditor = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/content/service-details?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setServiceDetails(data);
      } else {
        // Initialize with a default structure if not found
        setServiceDetails({
          aboutSection: { title: '', description: '', features: [], image: { url: '', publicId: '' } },
          projectsSection: { title: '', description: '', projects: [] },
          pricing: { enabled: false, title: '', plans: [] },
          faq: { title: '', description: '', items: [] },
        });
      }
    } catch (err) {
      setError('Failed to load service details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAboutChange = (field, value) => {
    setServiceDetails(prev => ({
      ...prev,
      aboutSection: { ...prev.aboutSection, [field]: value },
    }));
  };

  const handleAboutFeatureChange = (index, value) => {
    const newFeatures = [...serviceDetails.aboutSection.features];
    newFeatures[index] = value;
    handleAboutChange('features', newFeatures);
  };

  const addAboutFeature = () => {
    handleAboutChange('features', [...serviceDetails.aboutSection.features, '']);
  };

  const removeAboutFeature = (index) => {
    const newFeatures = serviceDetails.aboutSection.features.filter((_, i) => i !== index);
    handleAboutChange('features', newFeatures);
  };

  const handleAboutImageUpload = (url, publicId) => {
    setServiceDetails(prev => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        image: { url, publicId }
      },
    }));
  };

  // Projects section handlers
  const handleProjectsChange = (field, value) => {
    setServiceDetails(prev => ({
      ...prev,
      projectsSection: { ...prev.projectsSection, [field]: value },
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...(serviceDetails.projectsSection?.projects || [])];
    newProjects[index] = { ...newProjects[index], [field]: value };
    handleProjectsChange('projects', newProjects);
  };

  const handleProjectImageUpload = (index, url, publicId) => {
    const newProjects = [...(serviceDetails.projectsSection?.projects || [])];
    newProjects[index] = { ...newProjects[index], image: { url, publicId } };
    handleProjectsChange('projects', newProjects);
  };

  const addProject = () => {
    const currentProjects = serviceDetails.projectsSection?.projects || [];
    handleProjectsChange('projects', [...currentProjects, { title: '', image: { url: '', publicId: '' } }]);
  };

  const removeProject = (index) => {
    const newProjects = (serviceDetails.projectsSection?.projects || []).filter((_, i) => i !== index);
    handleProjectsChange('projects', newProjects);
  };

  // Pricing section handlers
  const handlePricingChange = (field, value) => {
    setServiceDetails(prev => ({
      ...prev,
      pricing: { ...prev.pricing, [field]: value },
    }));
  };

  const handlePricingPlanChange = (index, field, value) => {
    const newPlans = [...(serviceDetails.pricing?.plans || [])];
    newPlans[index] = { ...newPlans[index], [field]: value };
    handlePricingChange('plans', newPlans);
  };

  const addPricingPlan = () => {
    const currentPlans = serviceDetails.pricing?.plans || [];
    handlePricingChange('plans', [...currentPlans, { name: '', price: '', features: [] }]);
  };

  const removePricingPlan = (index) => {
    const newPlans = (serviceDetails.pricing?.plans || []).filter((_, i) => i !== index);
    handlePricingChange('plans', newPlans);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/content/service-details?slug=${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceDetails),
      });

      if (response.ok) {
        toast.success('Service details saved successfully!');
      } else {
        const errData = await response.json();
        setError(errData.message || 'Failed to save service details.');
        toast.error(errData.message || 'Failed to save service details.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      toast.error('An unexpected error occurred.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLayout><div className="admin-editor__loading">Loading...</div></AdminLayout>;
  }

  if (error && !serviceDetails) {
    return <AdminLayout><div className="admin-editor__error"><p>{error}</p></div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Edit Service Details | {slug}</title>
      </Head>
      <div className="admin-editor">
        <div className="admin-editor__header">
          <h1 className="admin-editor__title">Edit Service: <span style={{ color: '#4569e7' }}>{slug}</span></h1>
          <div className="admin-editor__actions">
            <Link href="/admin/services/services" className="admin-editor__back-button">Back to Services List</Link>
            <button onClick={handleSave} className="admin-editor__save-button" disabled={saving}>
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>

        {error && <div className="admin-editor__error"><p>{error}</p></div>}

        <div className="admin-editor__content">
          {/* About Section Editor */}
          <div className="admin-editor__section">
            <h2 className="admin-editor__section-title">About Section</h2>
            <div className="admin-editor__field">
              <label className="admin-editor__label">Title</label>
              <input
                type="text"
                className="admin-editor__input"
                value={serviceDetails.aboutSection?.title || ''}
                onChange={(e) => handleAboutChange('title', e.target.value)}
              />
            </div>
            <div className="admin-editor__field">
              <label className="admin-editor__label">Description</label>
              <textarea
                className="admin-editor__textarea"
                rows="4"
                value={serviceDetails.aboutSection?.description || ''}
                onChange={(e) => handleAboutChange('description', e.target.value)}
              />
            </div>
            <div className="admin-editor__field">
              <label className="admin-editor__label">Features</label>
              {serviceDetails.aboutSection?.features?.map((feature, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    className="admin-editor__input"
                    value={feature}
                    onChange={(e) => handleAboutFeatureChange(index, e.target.value)}
                  />
                  <button onClick={() => removeAboutFeature(index)} className="admin-editor__remove-button">Remove</button>
                </div>
              ))}
              <button onClick={addAboutFeature} className="admin-editor__add-button">Add Feature</button>
            </div>
            <div className="admin-editor__field">
              <label className="admin-editor__label">Image</label>
              <ImageUploader
                onImageUpload={handleAboutImageUpload}
                folder={`services/${slug}`}
                currentImage={serviceDetails.aboutSection?.image?.url}
                oldPublicId={serviceDetails.aboutSection?.image?.publicId}
              />
            </div>
          </div>

          {/* Projects Section Editor */}
          <div className="admin-editor__section">
            <h2 className="admin-editor__section-title">Projects Section</h2>
            <div className="admin-editor__field">
              <label className="admin-editor__label">Title</label>
              <input
                type="text"
                className="admin-editor__input"
                value={serviceDetails.projectsSection?.title || ''}
                onChange={(e) => handleProjectsChange('title', e.target.value)}
              />
            </div>
            <div className="admin-editor__field">
              <label className="admin-editor__label">Description</label>
              <textarea
                className="admin-editor__textarea"
                rows="3"
                value={serviceDetails.projectsSection?.description || ''}
                onChange={(e) => handleProjectsChange('description', e.target.value)}
              />
            </div>
            <div className="admin-editor__field">
              <label className="admin-editor__label">Projects</label>
              {serviceDetails.projectsSection?.projects?.map((project, index) => (
                <div key={index} style={{ border: '1px solid #e2e8f0', padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
                  <div className="admin-editor__field">
                    <label className="admin-editor__label">Project Title</label>
                    <input
                      type="text"
                      className="admin-editor__input"
                      value={project.title || ''}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="admin-editor__field">
                    <label className="admin-editor__label">Project Image</label>
                    <ImageUploader
                      onImageUpload={(url, publicId) => handleProjectImageUpload(index, url, publicId)}
                      folder={`services/${slug}/projects`}
                      currentImage={project.image?.url}
                      oldPublicId={project.image?.publicId}
                    />
                  </div>
                  <button onClick={() => removeProject(index)} className="admin-editor__remove-button">Remove Project</button>
                </div>
              ))}
              <button onClick={addProject} className="admin-editor__add-button">Add Project</button>
            </div>
          </div>

          {/* Service-Specific Pricing Section */}
          <div className="admin-editor__section">
            <h2 className="admin-editor__section-title">Service Pricing</h2>
            <div className="admin-editor__field">
              <label className="admin-editor__label">Enable Service-Specific Pricing</label>
              <input
                type="checkbox"
                checked={serviceDetails.pricing?.enabled || false}
                onChange={(e) => handlePricingChange('enabled', e.target.checked)}
              />
            </div>
            {serviceDetails.pricing?.enabled && (
              <>
                <div className="admin-editor__field">
                  <label className="admin-editor__label">Pricing Title</label>
                  <input
                    type="text"
                    className="admin-editor__input"
                    value={serviceDetails.pricing?.title || ''}
                    onChange={(e) => handlePricingChange('title', e.target.value)}
                  />
                </div>
                <div className="admin-editor__field">
                  <label className="admin-editor__label">Pricing Plans</label>
                  {serviceDetails.pricing?.plans?.map((plan, index) => (
                    <div key={index} style={{ border: '1px solid #e2e8f0', padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="admin-editor__field">
                          <label className="admin-editor__label">Plan Name</label>
                          <input
                            type="text"
                            className="admin-editor__input"
                            value={plan.name || ''}
                            onChange={(e) => handlePricingPlanChange(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="admin-editor__field">
                          <label className="admin-editor__label">Price</label>
                          <input
                            type="text"
                            className="admin-editor__input"
                            value={plan.price || ''}
                            onChange={(e) => handlePricingPlanChange(index, 'price', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="admin-editor__field">
                        <label className="admin-editor__label">Features (one per line)</label>
                        <textarea
                          className="admin-editor__textarea"
                          rows="4"
                          value={plan.features?.join('\n') || ''}
                          onChange={(e) => handlePricingPlanChange(index, 'features', e.target.value.split('\n').filter(f => f.trim()))}
                        />
                      </div>
                      <button onClick={() => removePricingPlan(index)} className="admin-editor__remove-button">Remove Plan</button>
                    </div>
                  ))}
                  <button onClick={addPricingPlan} className="admin-editor__add-button">Add Pricing Plan</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServiceDetailEditor;
