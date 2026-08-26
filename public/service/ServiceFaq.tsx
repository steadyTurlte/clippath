import React, { useState } from "react";
import Image from "next/image";
import Thumb from "public/images/faq-three-thumb.png";

interface ServiceFaqProps {
  data?: any;
  items?: Array<{ id?: number | string; question: string; answer: string }>;
}

const ServiceFaq = ({ data, items }: ServiceFaqProps) => {
  const [imgTab, setImgTab] = useState(0);

  const faqItems = items || (Array.isArray(data?.faqs) ? data.faqs : Array.isArray(data) ? data : []);
  if (!faqItems || faqItems.length === 0) return null;
  return (
    <section className="section faq-two faq-three">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-8">
            <div className="faq-two__content">
              <div className="section__header">
                <p
                  className="h6 sub-title "
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="100"
                >
                  FAQ
                </p>
                <h2
                  className="h2 title "
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="100"
                >
                  frequently ask questions
                </h2>
              </div>
              <div className="accordion" id="accordion">
                {faqItems.map((faq: any, index: number) => (
                  <div
                    key={faq.id || index}
                    className={
                      "accordion-item " + (imgTab == index ? " faq-two-active" : " ")
                    }
                    data-aos-duration="600"
                    data-aos-delay="100"
                  >
                    <h5 className="accordion-header" id={`heading${index}`}>
                      <button
                        className={
                          (imgTab == index ? "  " : " collapsed") +
                          " accordion-button"
                        }
                        onClick={() => setImgTab(imgTab === index ? -1 : index)}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded={imgTab === index}
                        aria-controls={`collapse${index}`}
                      >
                        {faq.question}
                      </button>
                    </h5>
                    <div
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse${
                        imgTab === index ? " show " : ""
                      }`}
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div
              className="faq-two__thumb "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <Image src={Thumb} alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
