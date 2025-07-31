import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/common/ImageUploader';
import { toast } from 'react-toastify';

const PaymentMethodsEditor = () => {
  const [paymentMethodsData, setPaymentMethodsData] = useState({
    title: '',
    logos: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the payment methods data when the component mounts
    const fetchPaymentMethodsData = async () => {
      try {
        const response = await fetch('/api/content/pricing?section=paymentMethods');
        const data = await response.json();
        setPaymentMethodsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment methods data:', error);
        toast.error('Failed to load payment methods data');
        setLoading(false);
      }
    };

    fetchPaymentMethodsData();
  }, []);

  const handleTitleChange = (e) => {
    setPaymentMethodsData({
      ...paymentMethodsData,
      title: e.target.value
    });
  };

  // Handle logo upload completion
  const handleLogoUpload = (index, imageUrl) => {
    if (!imageUrl) return;

    setPaymentMethodsData(prev => {
      const updatedLogos = [...prev.logos];
      updatedLogos[index] = imageUrl;

      return {
        ...prev,
        logos: updatedLogos
      };
    });
  };

  // Handle logo removal
  const handleRemoveLogo = (index) => {
    setPaymentMethodsData(prev => {
      const updatedLogos = [...prev.logos];
      updatedLogos.splice(index, 1);

      return {
        ...prev,
        logos: updatedLogos
      };
    });
  };

  // Add a new logo slot
  const handleAddLogo = () => {
    setPaymentMethodsData(prev => ({
      ...prev,
      logos: [...prev.logos, '']
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Filter out any empty logo entries and ensure they're strings
      const validLogos = paymentMethodsData.logos
        .filter(logo => {
          if (!logo) return false;
          if (typeof logo === 'string') return logo.trim() !== '';
          return false;
        })
        .map(logo => logo.trim());

      if (validLogos.length === 0) {
        toast.warning('Please add at least one payment method logo');
        return;
      }

      // Prepare data to save
      const dataToSave = {
        title: paymentMethodsData.title.trim(),
        logos: validLogos
      };

      const response = await fetch('/api/content/pricing?section=paymentMethods', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
      });

      if (response.ok) {
        setSaveSuccess(true);
        // Update local state with the saved data
        setPaymentMethodsData(prev => ({
          ...prev,
          logos: validLogos
        }));

        // Show success message
        window.scrollTo(0, 0);
        toast.success('Payment methods section saved successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save payment methods section');
        toast.error('Failed to save payment methods section');
      }
    } catch (error) {
      console.error('Error saving payment methods data:', error);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Error saving payment methods data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-editor__loading">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Edit Payment Methods Section | Photodit Admin</title>
      </Head>

      <div className="admin-editor">
        <div className="admin-editor__header">
          <h1 className="admin-editor__title">Edit Payment Methods Section</h1>
          <div className="admin-editor__actions">
            <Link href="/admin/pricing" className="admin-editor__back-button">
              Back to Pricing
            </Link>
            <button
              className="admin-editor__save-button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="admin-editor__success">
            <p>Payment methods section saved successfully!</p>
          </div>
        )}

        {error && (
          <div className="admin-editor__error">
            <p>{error}</p>
          </div>
        )}

        <div className="admin-editor__content">
          <div className="admin-editor__section">
            <h2 className="admin-editor__section-title">Payment Methods Section</h2>
            <div className="admin-editor__field">
              <label htmlFor="title" className="admin-editor__label">Title</label>
              <input
                type="text"
                id="title"
                className="admin-editor__input"
                value={paymentMethodsData.title}
                onChange={handleTitleChange}
                placeholder="Enter title"
              />
            </div>
          </div>

          <div className="admin-editor__section">
            <div className="admin-editor__section-header">
              <h3 className="admin-editor__section-title">Payment Method Logos</h3>
              <button
                type="button"
                onClick={handleAddLogo}
                className="add-logo"
                disabled={saving}
                style={{
                  background: '#3182ce',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  marginTop: '20px',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2c5282'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3182ce'}
              >
                <span>+</span> Add Logo
              </button>
            </div>
            <div className="admin-editor__payment-methods-help">
              <p className="admin-editor__help-text">
                <strong>Accepted formats:</strong> JPEG, PNG, GIF, WEBP, SVG (max 5MB)
              </p>
              <p className="admin-editor__help-text">
                <strong>Recommended ratio:</strong> 3:2
              </p>
            </div>
            <div className="logo-grid">
              {paymentMethodsData.logos.map((logo, index) => (
                <div key={index} className="logo-item">
                  <ImageUploader
                    currentImage={logo}
                    onImageUpload={(url) => handleLogoUpload(index, url)}
                    folder="payment-methods"
                    label={`Payment Method ${index + 1}`}
                    helpText="Recommended size: 120x80px"
                    maxSize={2} // 2MB
                    required
                    style={{ marginBottom: '10px' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLogo(index)}
                    className="remove-logo"
                    disabled={saving}
                    style={{
                      background: '#e53e3e',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      width: '100%',
                      marginTop: '8px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c53030'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#e53e3e'}
                  >
                    Remove Logo
                  </button>
                </div>
              ))}

              {paymentMethodsData.logos.length === 0 && (
                <div className="admin-editor__no-logos" style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '20px',
                  color: '#666',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}>
                  <p>No payment method logos added yet. Click &quot;Add Logo&quot; to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-editor__loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          font-size: 18px;
          color: #64748b;
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

        .admin-editor__actions {
          display: flex;
          gap: 12px;
        }

        .admin-editor__back-button {
          padding: 8px 16px;
          background-color: #f1f5f9;
          color: #1e293b;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
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

        .admin-editor__success {
          padding: 16px 20px;
          border-radius: 8px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          animation: slideIn 0.3s ease-out;
          background-color: #dcfce7;
          color: #166534;
          border-left: 4px solid #22c55e;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .admin-editor__success p {
          margin: 0;
          font-weight: 500;
        }

        .admin-editor__success p::before {
          content: '✅ ';
        }

        .admin-editor__error {
          padding: 16px 20px;
          border-radius: 8px;
          margin-bottom: 24px;
          background-color: #fee2e2;
          color: #b91c1c;
          border-left: 4px solid #ef4444;
        }

        .admin-editor__error p {
          margin: 0;
          font-weight: 500;
        }

        .admin-editor__section {
          margin-bottom: 24px;
        }

        .admin-editor__section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }

        .admin-editor__section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }

        .admin-editor__payment-methods-help {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .admin-editor__help-text {
          margin: 4px 0;
          font-size: 14px;
          color: #64748b;
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

        .admin-editor__input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 14px;
        }

        .logo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .logo-item {
          background: white;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .logo-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </AdminLayout>
  );
};

export default PaymentMethodsEditor;
