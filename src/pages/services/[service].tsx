import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/Banner/CmnBanner";
import ServiceDetailsAbout from "../../../public/service/ServiceDetailsAbout";
import ServiceProject from "../../../public/service/ServiceProject";
import ServicePricing from "../../../public/service/ServicePricing";
import ServiceFaq from "../../../public/service/ServiceFaq";
import Trial from "../../../public/service/Trial";
import QualitySec from "@/components/containers/home/QualitySec";
import TestimonialSec from "@/components/containers/home/TestimonialSec";
import SponsorSlider from "@/components/containers/home/SponsorSlider";
import ContactSec from "@/components/containers/ContactSec";
import PricingMain from "@/components/containers/pricing/PricingMain";

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

  const slugify = (text: string) =>
    (text || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch settings, pricing, testimonials, sponsors, FAQ and contact data in parallel
        const [settingsRes, pricingRes, aboutRes, contactRes] = await Promise.all([
          fetch("/api/content/settings"),
          fetch("/api/content/pricing"),
          fetch("/api/content/about"),
          fetch("/api/content/contact-info")
        ]);

        if (settingsRes.ok) {
          setSettings(await settingsRes.json());
        }
        
        if (pricingRes.ok) {
          setPricingData(await pricingRes.json());
        }

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setTestimonialData(aboutData.testimonials);
          setSponsorData(aboutData.sponsors);
          setFaqData(aboutData.faq);
        }

        if (contactRes.ok) {
          setContactInfo(await contactRes.json());
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
          const found = Array.isArray(data)
            ? data.find((s) => slugify(s.title) === service)
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
        // Fetch service details and projects for this service
        const [detailRes, projectsRes] = await Promise.all([
          fetch(`/api/content/services?section=details&slug=${service}`),
          fetch(`/api/content/portfolio?service=${service}`)
        ]);
        
        if (detailRes.ok) {
          setDetail(await detailRes.json());
        }
        
        if (projectsRes.ok) {
          setProjectsData(await projectsRes.json());
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
        <div className="service-detail-skeleton">
          <div className="skeleton-banner" />
          <div className="skeleton-content" />
        </div>
      </Layout>
    );
  }

  if (!serviceData) {
    return (
      <Layout settings={settings}>
        <CmnBanner title="Service Not Found" />
        <div className="service-detail-error">
          <h2>Service not found</h2>
          <p>The service you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout settings={settings}>
      {/* Banner with service title */}
      <CmnBanner title={serviceData.title} />

      {/* Service Details About Section - with actual service data */}
      <ServiceDetailsAbout 
        serviceData={serviceData}
        serviceDetails={detail}
      />

      {/* Quality/How It Works Section */}
      <QualitySec />

      {/* Service Projects Section - shows projects related to this service */}
      <ServiceProject 
        serviceData={serviceData}
        projectsData={projectsData}
      />

      {/* Pricing Section - uses general pricing */}
      {pricingData && (
        <PricingMain data={pricingData} />
      )}

      {/* Testimonials Section - reused from general testimonials */}
      {testimonialData && (
        <TestimonialSec data={testimonialData} />
      )}

      {/* FAQ Section - general FAQ for all services */}
      {faqData && (
        <ServiceFaq data={faqData} />
      )}

      {/* Contact Section - reused contact form */}
      {contactInfo && (
        <ContactSec contactInfo={contactInfo} mapData={{ embedUrl: "" }} />
      )}

      {/* Trial Section */}
      <Trial />

      {/* Logo Slider - reused sponsors */}
      {sponsorData && (
        <SponsorSlider data={sponsorData} />
      )}
    </Layout>
  );
};

export default ServiceDetail;
