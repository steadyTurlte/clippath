import React from "react";
import Image from "next/image";
import Link from "next/link";
import smallone from "public/images/pricing/small-one.png";
import smalltwo from "public/images/pricing/small-two.png";
import smallthree from "public/images/pricing/small-three.png";
import smallfour from "public/images/pricing/small-four.png";

const ServicePricing = () => {
  return (
    <section className="section pricing-two">
      <div className="container ">
        <div className="row align-items-center section__header--alt">
          <div className="col-12">
            <div className="section__header text-center">
              <p
                className="h6 sub-title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                clipping path cost
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                How much do clipping path services cost?
              </h2>
            </div>
          </div>
        </div>
        <div className="row gaper">
          <div className="col-12 col-md-6 col-lg-6 col-xxl-3">
            <div
              className="pricing-two__single "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <h5 className="h5">Clipping Path</h5>
              <div className="meta">
                <div className="content">
                  <h2 className="h2 title">$19</h2>
                  <p>39¢ PER IMAGE</p>
                </div>
                <div className="thumb">
                  <Image src={smallone} alt="Image" />
                </div>
              </div>
              <hr />
              <ul>
                <li>
                  <i className="fa-solid fa-check"></i>3 downloads per day
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>Access to all products
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>Access to new releases
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>15% renewal discount
                </li>
              </ul>
              <hr />
              <Link href="pricing" className="btn btn--secondary">
                get started now
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xxl-3">
            <div
              className="pricing-two__single "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <h5 className="h5 yel">Catalogue Making</h5>
              <div className="meta">
                <div className="content">
                  <h2 className="h2 title">$39</h2>
                  <p>39¢ PER IMAGE</p>
                </div>
                <div className="thumb">
                  <Image src={smalltwo} alt="Image" />
                </div>
              </div>
              <hr />
              <ul>
                <li>
                  <i className="fa-solid fa-check"></i>3 downloads per day
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>Access to all products
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>Access to new releases
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>15% renewal discount
                </li>
              </ul>
              <hr />
              <Link href="pricing" className="btn btn--secondary">
                get started now
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xxl-3">
            <div
              className="pricing-two__single pricing-two__single--alt "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <h5 className="h5 pri">Background Removal</h5>
              <div className="meta">
                <div className="content">
                  <h2 className="h2 title">$59</h2>
                  <p>39¢ PER IMAGE</p>
                </div>
                <div className="thumb">
                  <Image src={smallthree} alt="Image" />
                </div>
              </div>
              <hr />
              <ul>
                <li>
                  <i className="fa-solid fa-check"></i>3 downloads per day
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>Access to all products
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>Access to new releases
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>15% renewal discount
                </li>
              </ul>
              <hr />
              <Link href="pricing" className="btn btn--secondary">
                get started now
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xxl-3">
            <div
              className="pricing-two__single "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="600"
            >
              <h5 className="h5 tri">image masking</h5>
              <div className="meta">
                <div className="content">
                  <h2 className="h2 title">$79</h2>
                  <p>39¢ PER IMAGE</p>
                </div>
                <div className="thumb">
                  <Image src={smallfour} alt="Image" />
                </div>
              </div>
              <hr />
              <ul>
                <li>
                  <i className="fa-solid fa-check"></i>3 downloads per day
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>Access to all products
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>Access to new releases
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>15% renewal discount
                </li>
              </ul>
              <hr />
              <Link href="pricing" className="btn btn--secondary">
                get started now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;
