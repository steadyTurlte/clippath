import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceModal from '@/components/admin/ServiceModal';

const slugify = (text) =>
  (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

const ServicesAdmin = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isNew, setIsNew] = useState(false);

  // Fetch all services and details
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/content/services');
      if (!res.ok) {
        throw new Error('Failed to fetch services data');
      }
      const data = await res.json();
      const rawServices = Array.isArray(data.services) ? data.services : [];
      const detailsMap = data.details || {};

      // Combine services with their details
      const normalizedServices = rawServices.map((service) => {
        const slug = slugify(service.title);
        const details = detailsMap[slug] || {
          hero: { title: '', subtitle: '', description: '', beforeImage: { url: '', publicId: '' }, afterImage: { url: '', publicId: '' } },
          projects: []
        };
        return {
          ...service,
          details
        };
      });

      setServicesData(normalizedServices);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAddModal = () => {
    setEditingService(null);
    setIsNew(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setIsNew(false);
    setIsModalOpen(true);
  };

  const handleDeleteService = async (service) => {
    if (!window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      return;
    }

    try {
      const slug = slugify(service.title);
      const res = await fetch(`/api/content/services?id=${encodeURIComponent(service.id)}&slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete service');
      }

      toast.success(`Service "${service.title}" deleted successfully!`);
      fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service');
    }
  };

  const handleSaveModal = async (formData) => {
    // Check if service title already exists (ignoring current service when editing)
    const normTitle = (formData.title || '').trim().toLowerCase();
    const isDuplicate = servicesData.some(
      (item) =>
        (item.title || '').trim().toLowerCase() === normTitle &&
        (isNew || String(item.id) !== String(formData.id))
    );

    if (isDuplicate) {
      toast.error(`A service with the name "${formData.title}" already exists.`);
      return;
    }

    try {
      if (isNew) {
        // Create new service via POST
        const res = await fetch('/api/content/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: {
              id: Date.now(),
              title: formData.title,
              price: formData.price,
              description: formData.description,
              image: formData.image,
              className: formData.className || 'on'
            },
            details: formData.details
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to create service');
        }

        toast.success('Service created successfully!');
      } else {
        // Update existing service list via items-and-details PUT
        const slug = slugify(formData.title);
        const updatedList = servicesData.map((item) => {
          if (String(item.id) === String(formData.id)) {
            return {
              id: formData.id,
              title: formData.title,
              price: formData.price,
              description: formData.description,
              image: formData.image,
              className: formData.className || item.className || 'on'
            };
          }
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            className: item.className
          };
        });

        const detailsMap = {};
        servicesData.forEach((item) => {
          const s = slugify(item.title);
          if (String(item.id) === String(formData.id)) {
            detailsMap[slug] = formData.details;
          } else {
            detailsMap[s] = item.details;
          }
        });

        const res = await fetch('/api/content/services?section=items-and-details', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            services: updatedList,
            details: detailsMap
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to update service');
        }

        toast.success('Service updated successfully!');
      }

      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error('Error saving service:', err);
      toast.error(err.message || 'Failed to save service');
    }
  };

  // Filtered services
  const filteredServices = servicesData.filter(
    (service) =>
      service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <Head>
        <title>Manage Services | Photodit Admin</title>
      </Head>

      <div className="admin-services-page">
        {/* Header section */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Service Items Management</h1>
            <p className="page-subtitle">View, create, edit and manage service offerings.</p>
          </div>

          <div className="header-actions">
            <Link href="/admin/services" className="btn-back">
              <i className="fa-solid fa-arrow-left"></i> Back to Section List
            </Link>
            <button className="btn-create" onClick={handleOpenAddModal}>
              <i className="fa-solid fa-plus"></i> + Add New Service
            </button>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="table-toolbar">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search services by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                &times;
              </button>
            )}
          </div>
          <div className="item-count">{filteredServices.length} Services Total</div>
        </div>

        {/* Services Table */}
        <div className="table-container">
          {loading ? (
            <div className="table-status">Loading services...</div>
          ) : error ? (
            <div className="table-status error">{error}</div>
          ) : filteredServices.length === 0 ? (
            <div className="table-status empty">
              <p>No services found.</p>
              <button className="btn-create-sm" onClick={handleOpenAddModal}>
                + Add Your First Service
              </button>
            </div>
          ) : (
            <table className="services-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Image</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th style={{ width: '120px' }}>Projects</th>
                  <th style={{ width: '140px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => {
                  const slug = slugify(service.title);
                  const imageUrl = typeof service.image === 'object' ? service.image?.url : service.image;
                  const projectsCount = Array.isArray(service.details?.projects)
                    ? service.details.projects.length
                    : 0;

                  return (
                    <tr key={service.id || slug}>
                      <td>
                        <div className="thumbnail-box">
                          {imageUrl ? (
                            <img src={imageUrl} alt={service.title} />
                          ) : (
                            <span className="no-img">No Image</span>
                          )}
                        </div>
                      </td>
                      <td className="title-cell">
                        <strong>{service.title}</strong>
                      </td>
                      <td>
                        <code className="slug-tag">/{slug}</code>
                      </td>
                      <td>{service.price || '-'}</td>
                      <td className="desc-cell">{service.description || '-'}</td>
                      <td>
                        <span className="badge">{projectsCount} Projects</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="actions-cell">
                          <button
                            className="action-btn edit-btn"
                            title="Edit Service"
                            onClick={() => handleOpenEditModal(service)}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn delete-btn"
                            title="Delete Service"
                            onClick={() => handleDeleteService(service)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal */}
        <ServiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveModal}
          service={editingService}
          isNew={isNew}
        />
      </div>

      <style jsx>{`
        .admin-services-page {
          padding: 24px;
          background: #f8fafc;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .page-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .btn-back {
          padding: 10px 16px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .btn-back:hover {
          background: #f1f5f9;
        }

        .btn-create {
          padding: 10px 18px;
          background: #2563eb;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-create:hover {
          background: #1d4ed8;
        }

        .table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          background: #ffffff;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .search-box {
          position: relative;
          width: 360px;
        }

        .search-box input {
          width: 100%;
          padding: 8px 36px 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }

        .search-box input:focus {
          border-color: #2563eb;
        }

        .clear-search {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 18px;
          color: #94a3b8;
          cursor: pointer;
        }

        .item-count {
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
        }

        .table-container {
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .table-status {
          padding: 48px;
          text-align: center;
          color: #64748b;
          font-size: 15px;
        }

        .table-status.error {
          color: #dc2626;
        }

        .table-status.empty p {
          margin-bottom: 16px;
        }

        .btn-create-sm {
          padding: 8px 16px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
        }

        .services-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .services-table th {
          background: #f8fafc;
          padding: 14px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
        }

        .services-table td {
          padding: 14px 16px;
          font-size: 14px;
          color: #1e293b;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .services-table tr:last-child td {
          border-bottom: none;
        }

        .thumbnail-box {
          width: 54px;
          height: 44px;
          border-radius: 6px;
          background: #f1f5f9;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e8f0;
        }

        .thumbnail-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .no-img {
          font-size: 10px;
          color: #94a3b8;
        }

        .slug-tag {
          background: #f1f5f9;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 12px;
          color: #475569;
        }

        .desc-cell {
          max-width: 260px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #64748b;
        }

        .badge {
          display: inline-block;
          padding: 4px 8px;
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .actions-cell {
          display: inline-flex;
          gap: 8px;
        }

        .action-btn {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }

        .edit-btn {
          background: #eff6ff;
          color: #2563eb;
          border-color: #bfdbfe;
        }

        .edit-btn:hover {
          background: #dbeafe;
        }

        .delete-btn {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecaca;
        }

        .delete-btn:hover {
          background: #fee2e2;
        }
      `}</style>
    </AdminLayout>
  );
};

export default ServicesAdmin;
