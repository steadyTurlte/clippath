import React from "react";
import Link from "next/link";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const ServiceDetailsAbout = () => {
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
                      src="/images/services/before.png"
                      alt="Image one"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src="/images/services/after.png"
                      alt="Image two"
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
                professional clipping path
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                Edit your photo in seconds with photodit
              </h2>
              <div
                className="paragraph "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                <p className="fw-5">
                  Image editing services for ecommerce businesses and pros, from
                  product photographers to Amazon sellers to global brands.
                </p>
                <p>
                  Because a quick product shoot can easily turn into a week or
                  more of editing and formatting your images. Let us look after
                  the edits, so you can get back to the work that needs you.
                </p>
              </div>
              <div className="cta__group justify-content-start">
                <Link href="contact-us" className="btn btn--primary">
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
