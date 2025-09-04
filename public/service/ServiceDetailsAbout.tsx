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

const ServiceDetailsAbout = ({ serviceData, serviceDetails }: ServiceDetailsAboutProps) => {
  // Get before/after images from service details or use defaults
  const beforeImage = serviceDetails?.hero?.beforeImage?.url || "/images/services/before.png";
  const afterImage = serviceDetails?.hero?.afterImage?.url || "/images/services/after.png";
  const heroTitle = serviceDetails?.hero?.title || serviceData?.title;
  const heroSubtitle = serviceDetails?.hero?.subtitle || serviceData?.title;
  const heroDescription = serviceDetails?.hero?.description || serviceData?.description;

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
                {heroSubtitle || "Professional Service"}
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {heroTitle || "Professional Photo Editing Service"}
              </h2>
              <div
                className="paragraph "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                <p className="fw-5">
                  {heroDescription || "Professional photo editing services tailored to your specific needs."}
                </p>
                {serviceData?.price && (
                  <div className="service-price">
                    <span className="price-label">Starting from: </span>
                    <span className="price-value">{serviceData.price}</span>
                  </div>
                )}
              </div>
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
