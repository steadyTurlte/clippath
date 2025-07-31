import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/components/layout/Layout";

const ServiceDetail = () => {
  const router = useRouter();
  const { service } = router.query;
  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/content/settings");
        if (res.ok) {
          setSettings(await res.json());
        }
      } catch {}
    };
    fetchSettings();
  }, []);

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

  return (
    <Layout settings={settings}>
      <div className="container service-detail-page">
        {loading ? (
          <div className="service-detail-skeleton">
            <div className="skeleton-img" />
            <div className="skeleton-title" />
            <div className="skeleton-price" />
            <div className="skeleton-desc" />
          </div>
        ) : !serviceData ? (
          <div className="service-detail-error">Service not found.</div>
        ) : (
          <div className="service-detail-card">
            <Image
              src={
                typeof serviceData.image === "object" && serviceData.image?.url
                  ? serviceData.image.url
                  : serviceData.image || "/images/services/slide-one.png"
              }
              alt={serviceData.title}
              width={400}
              height={300}
              className="service-detail-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/services/slide-one.png";
              }}
            />
            <div className="service-detail-content">
              <h1>{serviceData.title}</h1>
              <p className="service-detail-price">{serviceData.price}</p>
              <p className="service-detail-desc">{serviceData.description}</p>
            </div>
          </div>
        )}
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
          .service-detail-skeleton {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
          }
          .skeleton-img {
            width: 400px;
            height: 300px;
            background: linear-gradient(
              90deg,
              #f3f3f3 25%,
              #ececec 50%,
              #f3f3f3 75%
            );
            border-radius: 8px;
            margin-bottom: 24px;
            animation: skeleton-loading 1.2s infinite linear;
          }
          .skeleton-title {
            width: 60%;
            height: 32px;
            background: #ececec;
            border-radius: 6px;
            margin-bottom: 16px;
            animation: skeleton-loading 1.2s infinite linear;
          }
          .skeleton-price {
            width: 40%;
            height: 24px;
            background: #ececec;
            border-radius: 6px;
            margin-bottom: 16px;
            animation: skeleton-loading 1.2s infinite linear;
          }
          .skeleton-desc {
            width: 90%;
            height: 60px;
            background: #ececec;
            border-radius: 6px;
            animation: skeleton-loading 1.2s infinite linear;
          }
          @keyframes skeleton-loading {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }
          .service-detail-error {
            color: #b91c1c;
            background: #fee2e2;
            padding: 24px;
            border-radius: 8px;
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
