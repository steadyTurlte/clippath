import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

const ServiceDetail = () => {
  const router = useRouter();
  const { service } = router.query;
  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!service) return;
    const fetchService = async () => {
      try {
        const res = await fetch("/api/content/services?section=services");
        if (res.ok) {
          const data = await res.json();
          const found = Array.isArray(data)
            ? data.find(
                (s) => s.title.toLowerCase().replace(/\s+/g, "-") === service
              )
            : null;
          setServiceData(found);
        }
      } catch (err) {
        setServiceData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [service]);

  if (loading) return <div className="container">Loading...</div>;
  if (!serviceData) return <div className="container">Service not found.</div>;

  return (
    <div className="container service-detail-page">
      <div className="service-detail-card">
        <Image
          src={serviceData.image}
          alt={serviceData.title}
          width={400}
          height={300}
          className="service-detail-img"
        />
        <div className="service-detail-content">
          <h1>{serviceData.title}</h1>
          <p className="service-detail-price">{serviceData.price}</p>
          <p className="service-detail-desc">{serviceData.description}</p>
        </div>
      </div>
      <style jsx>{`
        .service-detail-page {
          padding: 40px 0;
        }
        .service-detail-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
          padding: 32px;
          max-width: 600px;
          margin: 0 auto;
        }
        .service-detail-img {
          border-radius: 8px;
          margin-bottom: 24px;
        }
        .service-detail-content h1 {
          font-size: 2rem;
          margin-bottom: 12px;
        }
        .service-detail-price {
          color: #3b82f6;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .service-detail-desc {
          font-size: 1.1rem;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
