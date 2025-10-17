import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ServiceDetailsAboutProps {
  serviceData?: any;
  serviceDetails?: any;
}

const ServiceDetailsAbout = ({ serviceData, serviceDetails }: ServiceDetailsAboutProps) => {
  // Debug logging
  console.log('ServiceDetailsAbout - serviceDetails:', serviceDetails);
  console.log('ServiceDetailsAbout - hero data:', serviceDetails?.hero);
  
  // Get before/after images from service details or use defaults
  const beforeImage = serviceDetails?.hero?.beforeImage?.url || "/images/services/before.png";
  const afterImage = serviceDetails?.hero?.afterImage?.url || "/images/services/after.png";
  
  console.log('Before image:', beforeImage);
  console.log('After image:', afterImage);
  
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

  return (
    <section className="section bg-white about-section service-de-thumb-alt">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-5 col-xl-6">
            <div
              className="about-section__thumb "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <div className="rangu">
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
          <div className="col-12 col-lg-7 col-xl-6">
            <div className="about-section__content section__content">
              <p
                className="h6 sub-title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {heroSubtitle}
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {heroTitle}
              </h2>
              <div
                className="paragraph service-description-content"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                <div 
                  className="fw-5 rich-text-content"
                  dangerouslySetInnerHTML={{ __html: heroDescription }}
                />
                {serviceData?.price && (
                  <div className="service-price">
                    <span className="price-label">Starting from: </span>
                    <span className="price-value">{serviceData.price}</span>
                  </div>
                )}
              </div>
              <style jsx global>{`
                .service-description-content .rich-text-content {
                  text-transform: none !important;
                }
                .service-description-content .rich-text-content h1,
                .service-description-content .rich-text-content h2,
                .service-description-content .rich-text-content h3,
                .service-description-content .rich-text-content h4,
                .service-description-content .rich-text-content h5,
                .service-description-content .rich-text-content h6 {
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                  font-weight: 600;
                }
                .service-description-content .rich-text-content p {
                  margin-bottom: 1rem;
                  text-transform: none;
                }
                .service-description-content .rich-text-content ul,
                .service-description-content .rich-text-content ol {
                  margin-left: 1.5rem;
                  margin-bottom: 1rem;
                }
                .service-description-content .rich-text-content li {
                  margin-bottom: 0.5rem;
                  text-transform: none;
                }
                .service-description-content .rich-text-content strong {
                  font-weight: 700;
                }
                .service-description-content .rich-text-content em {
                  font-style: italic;
                }
                .service-description-content .rich-text-content blockquote {
                  border-left: 4px solid #4569e7;
                  padding-left: 1rem;
                  margin: 1rem 0;
                  font-style: italic;
                  color: #555;
                }
                .service-description-content .rich-text-content code {
                  background-color: #f4f4f4;
                  padding: 0.2rem 0.4rem;
                  border-radius: 3px;
                  font-family: monospace;
                  font-size: 0.9em;
                }
                .service-description-content .rich-text-content pre {
                  background-color: #f4f4f4;
                  padding: 1rem;
                  border-radius: 5px;
                  overflow-x: auto;
                  margin: 1rem 0;
                }
                .service-description-content .rich-text-content pre code {
                  background-color: transparent;
                  padding: 0;
                }
              `}</style>
              <div className="cta__group justify-content-start">
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
