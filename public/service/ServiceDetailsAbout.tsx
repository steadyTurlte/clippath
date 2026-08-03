import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ServiceDetailsAboutProps {
  serviceData?: any;
  serviceDetails?: any;
}

const normalizeRichTextLinks = (html: string) =>
  html.replace(
    /(<a\b[^>]*\bhref\s*=\s*)(["'])(.*?)\2/gi,
    (match, attributeStart, quote, href) => {
      const trimmedHref = href.trim();
      const isBareDomain = /^(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i.test(trimmedHref);

      return isBareDomain
        ? `${attributeStart}${quote}https://${trimmedHref}${quote}`
        : match;
    }
  );

const ServiceDetailsAbout = ({ serviceData, serviceDetails }: ServiceDetailsAboutProps) => {
  // Extract main service image if serviceData.image is a string or object
  const mainServiceImage = typeof serviceData?.image === "object" 
    ? serviceData?.image?.url 
    : serviceData?.image;

  // Get before/after images from service details, fallback to main service image from admin panel, then fallback to defaults
  const beforeImage = 
    (serviceDetails?.hero?.beforeImage?.url && serviceDetails.hero.beforeImage.url.trim() !== "")
      ? serviceDetails.hero.beforeImage.url
      : (mainServiceImage && typeof mainServiceImage === "string" && mainServiceImage.trim() !== "")
      ? mainServiceImage
      : "/images/services/before.png";

  const afterImage = 
    (serviceDetails?.hero?.afterImage?.url && serviceDetails.hero.afterImage.url.trim() !== "")
      ? serviceDetails.hero.afterImage.url
      : (mainServiceImage && typeof mainServiceImage === "string" && mainServiceImage.trim() !== "")
      ? mainServiceImage
      : "/images/services/after.png";
  
  // Use hero content from admin panel if available, otherwise fallback to service data
  const heroTitle = (serviceDetails?.hero?.title && serviceDetails.hero.title.trim()) 
    ? serviceDetails.hero.title 
    : serviceData?.title || "Professional Photo Editing Service";
    
  const heroSubtitle = (serviceDetails?.hero?.subtitle && serviceDetails.hero.subtitle.trim()) 
    ? serviceDetails.hero.subtitle 
    : serviceData?.title || "Professional Service";
    
  const heroDescription = (serviceDetails?.hero?.description && serviceDetails.hero.description.trim()) 
    ? serviceDetails.hero.description 
    : serviceData?.description || "Professional photo editing services tailored to your specific needs.";
  const renderedHeroDescription = normalizeRichTextLinks(heroDescription);

  return (
    <section className="section bg-white about-section service-de-thumb-alt">
      <div className="container">
        <div className="row justify-content-center">
          {/* Top Center Image Container */}
          <div className="col-12 col-lg-10 col-xl-9">
            <div
              className="about-section__thumb text-center mx-auto mb-5"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
              style={{ maxWidth: "850px", margin: "0 auto" }}
            >
              <div
                className="rangu shadow-sm"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                }}
              >
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={beforeImage}
                      alt="Before"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={afterImage}
                      alt="After"
                    />
                  }
                />
              </div>
            </div>
          </div>

          {/* Description Content Section Taking Full Container Width Underneath Image */}
          <div className="col-12">
            <div className="about-section__content section__content w-100 mt-2">
              {heroSubtitle && (
                <p
                  className="h6 sub-title text-center text-md-start"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="100"
                >
                  {heroSubtitle}
                </p>
              )}
              {heroTitle && (
                <h2
                  className="h2 title text-center text-md-start mb-4"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="100"
                >
                  {heroTitle}
                </h2>
              )}
              <div
                className="paragraph service-description-content w-100"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                <div 
                  className="fw-5 rich-text-content w-100"
                  dangerouslySetInnerHTML={{ __html: renderedHeroDescription }}
                />
                {serviceData?.price && (
                  <div className="service-price mt-4">
                    <span className="price-label">Starting from: </span>
                    <span className="price-value">{serviceData.price}</span>
                  </div>
                )}
              </div>
              <style jsx global>{`
                .service-de-thumb-alt .about-section__content {
                  padding-left: 0 !important;
                  width: 100% !important;
                  max-width: 100% !important;
                }
                .service-de-thumb-alt .h2 {
                  max-width: 100% !important;
                  width: 100% !important;
                }
                .service-de-thumb-alt .paragraph {
                  max-width: 100% !important;
                  width: 100% !important;
                }
                .service-description-content .rich-text-content {
                  text-transform: none !important;
                  line-height: 1.8;
                  font-size: 1.05rem;
                  color: #334155;
                  width: 100% !important;
                  max-width: 100% !important;
                }
                .service-description-content .rich-text-content h1,
                .service-description-content .rich-text-content h2,
                .service-description-content .rich-text-content h3,
                .service-description-content .rich-text-content h4,
                .service-description-content .rich-text-content h5,
                .service-description-content .rich-text-content h6 {
                  margin-top: 1.75rem;
                  margin-bottom: 0.85rem;
                  font-weight: 600;
                  color: #0f172a;
                  max-width: 100% !important;
                }
                .service-description-content .rich-text-content p {
                  margin-bottom: 1.25rem;
                  text-transform: none;
                  width: 100% !important;
                  max-width: 100% !important;
                }
                .service-description-content .rich-text-content ul,
                .service-description-content .rich-text-content ol {
                  margin-left: 1.75rem;
                  margin-bottom: 1.25rem;
                }
                .service-description-content .rich-text-content li {
                  margin-bottom: 0.5rem;
                  text-transform: none;
                }
                .service-description-content .rich-text-content strong {
                  font-weight: 700;
                  color: #0f172a;
                }
                .service-description-content .rich-text-content a {
                  color: #e67e22;
                  text-decoration: underline;
                  text-decoration-thickness: 1px;
                  text-underline-offset: 2px;
                  font-weight: 600;
                }
                .service-description-content .rich-text-content a:hover,
                .service-description-content .rich-text-content a:focus-visible {
                  color: #bd5b0a;
                  text-decoration-thickness: 2px;
                }
                .service-description-content .rich-text-content em {
                  font-style: italic;
                }
                .service-description-content .rich-text-content blockquote {
                  border-left: 4px solid #4569e7;
                  padding-left: 1.25rem;
                  margin: 1.5rem 0;
                  font-style: italic;
                  color: #475569;
                  background: #f8fafc;
                  padding-top: 0.75rem;
                  padding-bottom: 0.75rem;
                  border-radius: 0 8px 8px 0;
                }
                .service-description-content .rich-text-content code {
                  background-color: #f1f5f9;
                  padding: 0.2rem 0.5rem;
                  border-radius: 4px;
                  font-family: monospace;
                  font-size: 0.9em;
                  color: #0f172a;
                }
                .service-description-content .rich-text-content pre {
                  background-color: #f1f5f9;
                  padding: 1.25rem;
                  border-radius: 8px;
                  overflow-x: auto;
                  margin: 1.5rem 0;
                }
                .service-description-content .rich-text-content pre code {
                  background-color: transparent;
                  padding: 0;
                }
              `}</style>
              <div className="cta__group justify-content-start mt-4">
                <Link href="/get-quote" className="btn btn--primary">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsAbout;
