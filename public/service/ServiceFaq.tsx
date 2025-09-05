import React, { useState } from "react";
import Image from "next/image";
import Thumb from "public/images/faq-three-thumb.png";

interface ServiceFaqProps {
  data?: any;
}

const ServiceFaq = ({ data }: ServiceFaqProps) => {
  const [imgTab, setImgTab] = useState(0);
  
  // Use dynamic FAQ data if available, otherwise fallback to default
  const faqItems = data?.faqs || [
    {
      id: 1,
      question: "What is included in your photo editing services?",
      answer: "Our comprehensive photo editing services include background removal, color correction, retouching, shadow creation, and much more to enhance your images professionally."
    },
    {
      id: 2,
      question: "How long does it take to complete an order?",
      answer: "Turnaround time depends on the complexity and quantity of images. Most standard edits are completed within 24-48 hours, while complex projects may take 3-5 business days."
    },
    {
      id: 3,
      question: "What file formats do you accept?",
      answer: "We accept all major image formats including JPEG, PNG, TIFF, PSD, and RAW files from various camera manufacturers."
    },
    {
      id: 4,
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer competitive pricing for bulk orders. The more images you send, the better rates you'll receive. Contact us for custom pricing."
    },
    {
      id: 5,
      question: "Is there a revision policy?",
      answer: "We offer unlimited revisions until you're completely satisfied with the results. Your satisfaction is our top priority."
    }
  ];
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
