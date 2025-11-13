import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import ServiceDetailsAbout from "../../../public/service/ServiceDetailsAbout";
import ServiceProject from "../../../public/service/ServiceProject";
import ServiceFaq from "../../../public/service/ServiceFaq";
import TestimonialSec from "@/components/containers/home/TestimonialSec";
import SponsorSlider from "@/components/containers/home/SponsorSlider";
import ContactSec from "@/components/containers/ContactSec";
import PricingMain from "@/components/containers/pricing/PricingMain";
import HowItWorks from "@/components/containers/HowItWorks";

const ServiceDetail = () => {
  const router = useRouter();
  const { service } = router.query;
  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  const [detail, setDetail] = useState<any>(null);
  const [pricingData, setPricingData] = useState<any>(null);
  const [faqData, setFaqData] = useState<any>(null);
  const [testimonialData, setTestimonialData] = useState<any>(null);
  const [sponsorData, setSponsorData] = useState<any>(null);
  const [projectsData, setProjectsData] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [howItWorksData, setHowItWorksData] = useState<any>(null);

  const slugify = (text: string) =>
    (text || "")
      .toLowerCase()
      .trim()
      .replace(/&/g, "and") // Replace & with "and" before removing other special chars
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch settings, pricing, testimonials, sponsors, FAQ, contact data and details banner in parallel
        const [
          settingsRes,
          pricingRes,
          aboutRes,
          contactRes,
          howItWorksRes,
          testimonialsRes,
        ] = await Promise.all([
          fetch("/api/content/settings"),
          fetch("/api/content/pricing"),
          fetch("/api/content/about"),
          fetch("/api/content/contact-info"),
          fetch("/api/content/how-it-works"),
          fetch("/api/content/testimonials"),
        ]);

        if (settingsRes.ok) {
          setSettings(await settingsRes.json());
        }
        
        if (pricingRes.ok) {
          setPricingData(await pricingRes.json());
        }

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setSponsorData(aboutData.sponsors);
          setFaqData(aboutData.faq);
        }

        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          setTestimonialData(Array.isArray(testimonialsData) ? testimonialsData : testimonialsData.items || []);
        }

        if (contactRes.ok) {
          setContactInfo(await contactRes.json());
        }
        
        if(howItWorksRes.ok) {
          setHowItWorksData(await howItWorksRes.json());
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!service) return;
    const fetchService = async () => {
      try {
        const res = await fetch("/api/content/services?section=services");
        if (res.ok) {
          const data = await res.json();
          // Decode the URL-encoded service parameter
          const decodedService = decodeURIComponent(service as string);
          const found = Array.isArray(data)
            ? data.find((s) => slugify(s.title) === decodedService || slugify(s.title) === service)
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

  useEffect(() => {
    if (!service) return;
    const fetchServiceDetails = async () => {
      try {
        // Decode the URL-encoded service parameter
        const decodedService = decodeURIComponent(service as string);
        // Fetch service details and projects for this service
        const [detailRes, projectsRes] = await Promise.all([
          fetch(`/api/content/services?section=details&slug=${encodeURIComponent(decodedService)}`),
          fetch(`/api/content/portfolio?service=${encodeURIComponent(decodedService)}`)
        ]);
        
        if (detailRes.ok) {
          const detailData = await detailRes.json();
          setDetail(detailData);
        }
        
        if (projectsRes.ok) {
          const portfolioData = await projectsRes.json();
          setProjectsData(portfolioData?.projects || portfolioData || []);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };
    fetchServiceDetails();
  }, [service]);

  if (loading) {
    return (
      <Layout settings={settings}>
        <div className="service-detail-loader">
          <div className="loader-container">
            <div className="loader-spinner"></div>
            <p>Loading service details...</p>
          </div>
        </div>
        <style jsx>{`
          .service-detail-loader {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8fafc;
          }
          .loader-container {
            text-align: center;
          }
          .loader-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #4569e7;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loader-container p {
            color: #64748b;
            font-size: 16px;
            margin: 0;
          }
        `}</style>
      </Layout>
    );
  }

  if (!serviceData) {
    return (
      <Layout settings={settings}>
        <div className="service-detail-error">
          <h2>Service not found</h2>
          <p>The service you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout settings={settings}>
      {/* Service Title Section */}
      <section className="section" style={{ paddingTop: '80px', paddingBottom: '40px', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="h2" style={{ textAlign: 'center', margin: 0, fontWeight: 700, color: '#1e293b', fontSize: '2rem' }}>
                {serviceData.title}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details About Section - Hero with before/after slider and dynamic content */}
      <ServiceDetailsAbout 
        serviceData={serviceData}
        serviceDetails={detail}
      />

      {/* How It Works Section - Common for all services */}
      {howItWorksData && <HowItWorks data={howItWorksData} />}

      {/* Service Projects Section - Specific to each service */}
      <ServiceProject 
        serviceData={serviceData}
        projectsData={Array.isArray(projectsData) ? projectsData : (detail?.projects || [])}
      />

      {/* Pricing Section - Same as main page */}
      <PricingMain data={pricingData || { main: { plans: [] } }} />

      {/* Client Testimonials Section - Common for all services */}
      <TestimonialSec data={testimonialData || []} />

      {/* FAQ Section - Common for all services */}
      <ServiceFaq data={faqData || { faqs: [] }} />

      {/* Contact Us Section - Functional contact form */}
      {contactInfo && (
        <ContactSec 
          contactInfo={contactInfo} 
          mapData={{ embedUrl: "" }}
          title="Contact Us"
          description="Ready to get started? Contact us today for a free quote and let us transform your images."
        />
      )}

      {/* Sponsors Logo Section - Common for all services */}
      {sponsorData && (
        <SponsorSlider data={sponsorData} />
      )}
    </Layout>
  );
};

export default ServiceDetail;
