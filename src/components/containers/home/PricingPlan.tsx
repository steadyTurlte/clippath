import React from "react";
import Link from "next/link";
import Image from "next/image";
import star from "public/images/pricing/star.png";
import starhover from "public/images/pricing/star-hover.png";

interface PricingPlanProps {
  data: {
    subtitle: string;
    title: string;
    plans: {
      id: number;
      name: string;
      price: string;
      unit: string;
      description: string;
      features: string[];
      recommended: boolean;
    }[];
  };
}

const PricingPlan = ({ data }: PricingPlanProps) => {
  const pricingData = {
    ...data,
    plans: data?.plans || [],
  };
  
  return (
    <section className="section pricing-main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <p
                className="subtitle text-uppercase"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                {pricingData.subtitle}
              </p>
              <h2
                className="title title-animation"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {pricingData.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="row gaper">
          {pricingData.plans.map((plan, index) => (
            <div key={plan.id} className="col-12 col-md-6 col-xl-4">
              <div
                className={`pricing-main__single ${
                  plan.recommended ? "pricing-main__single--recommended" : ""
                }`}
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={index % 3 === 0 ? "100" : index % 3 === 1 ? "300" : "500"}
              >
                {plan.recommended && (
                  <div className="pricing-main__recommended-badge">
                    Recommended
                  </div>
                )}

                <div className="content">
                  <h4 className="h4">{plan.name}</h4>
                  <div className="paragraph">
                    <p>{plan.description}</p>
                    <p>
                      starting at <strong>{plan.price} Only</strong>{" "}
                      <span>{plan.unit}</span>
                    </p>
                  </div>
                  {plan.features && plan.features.length > 0 && (
                    <div className="features">
                      <ul className="features-list">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="feature-item" style={{ textAlign: 'start' }}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="cta__group">
                  <Link
                    href="/sign-in"
                    aria-label="Get Started"
                    className="btn btn--secondary text-uppercase"
                  >
                    Get Started
                  </Link>
                </div>
                <div className="anime">
                  <Image src={star} alt="Decoration" />
                  <Image src={starhover} alt="Decoration" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .pricing-main__single {
          background: #ffffff;
          border-radius: 8px;
          padding: 40px 30px;
          position: relative;
          height: 100%;
          transition: all 0.4s ease;
          border: 1px solid #e2e8f0;
        }

        .pricing-main__single:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .pricing-main__single--recommended {
          border: 2px solid #4569e7;
          position: relative;
        }

        .pricing-main__recommended-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #4569e7;
          color: white;
          font-size: 12px;
          padding: 4px 8px;
          border-bottom-left-radius: 4px;
          z-index: 1;
        }

        .content {
          text-align: center;
          margin-bottom: 24px;
        }

        .content h4 {
          font-size: 24px;
          margin-bottom: 15px;
          color: #1e293b;
        }

        .paragraph p {
          color: #64748b;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .features {
          margin: 24px 0;
          text-align: start;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          color: #475569;
          font-size: 14px;
          line-height: 1.6;
        }

        .feature-item:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
        }

        .cta__group {
          text-align: center;
          margin-top: 24px;
        }

        .btn--secondary {
          background-color: #4569e7;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 500;
          text-transform: uppercase;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .btn--secondary:hover {
          background-color: #3451b2;
          color: white;
          transform: translateY(-2px);
        }

        .anime {
          position: absolute;
          bottom: 20px;
          right: 20px;
          opacity: 0.1;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default PricingPlan;
