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
              {serviceData?.image ? (
                <div className="service-image-container">
                  <Image
                    src={
                      typeof serviceData.image === "object" && serviceData.image?.url
                        ? serviceData.image.url
                        : serviceData.image || "/images/services/slide-one.png"
                    }
                    alt={serviceData.title || "Service"}
                    width={500}
                    height={400}
                    className="service-main-image"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                  />
                </div>
              ) : (
                <div className="rangu">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src="/images/services/before.png"
                        alt="Before"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src="/images/services/after.png"
                        alt="After"
                      />
                    }
                  />
                </div>
              )}
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
                {serviceData?.title || "Professional Service"}
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {serviceDetails?.title || serviceData?.title || "Professional Photo Editing Service"}
              </h2>
              <div
                className="paragraph "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                <p className="fw-5">
                  {serviceDetails?.shortDescription || serviceData?.description || 
                   "Professional photo editing services tailored to your specific needs."}
                </p>
                <p>
                  {serviceDetails?.longDescription || 
                   "Our team of expert editors ensures that every image is processed with precision and care, delivering high-quality results that exceed your expectations."}
                </p>
                {serviceData?.price && (
                  <div className="service-price">
                    <span className="price-label">Starting from: </span>
                    <span className="price-value">{serviceData.price}</span>
                  </div>
                )}
              </div>
              <div className="cta__group justify-content-start">
                <Link href="/contact-us" className="btn btn--primary">
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
