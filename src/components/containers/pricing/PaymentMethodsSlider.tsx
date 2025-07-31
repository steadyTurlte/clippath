import React from "react";
import Image from "next/image";
import ImageWithFallback from "@/components/admin/ImageWithFallback";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface PaymentMethodsSliderProps {
  data?: {
    title?: string;
    logos?: string[];
  };
}

const defaultPaymentMethods = {
  title: "Supported Payment Methods",
  logos: [
    "/images/payment/visa.png",
    "/images/payment/mastercard.png",
    "/images/payment/paypal.png",
    "/images/payment/stripe.png",
    "/images/payment/american-express.png",
  ],
};

const PaymentMethodsSlider = ({ data }: PaymentMethodsSliderProps) => {
  const paymentMethodsData = data || defaultPaymentMethods;

  if (!paymentMethodsData.logos || paymentMethodsData.logos.length === 0) {
    return null;
  }

  return (
    <div className="payment-methods section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="section__header text-center">
              <h1
                className="h4 text-capitalize"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {paymentMethodsData.title}
              </h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="payment-methods__slider-wrapper">
              <Swiper
                slidesPerView={2}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={1200}
                loop={true}
                roundLengths={true}
                centeredSlides={true}
                centeredSlidesBounds={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  1600: {
                    slidesPerView: 6,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  576: {
                    slidesPerView: 3,
                  },
                }}
                className="payment-methods__slider"
              >
                {paymentMethodsData.logos.map((logo, index) => (
                  <SwiperSlide key={index}>
                    <div className="payment-methods__slider-item">
                      <ImageWithFallback
                        src={logo}
                        alt={`Payment Method ${index + 1}`}
                        width={120}
                        height={80}
                        fallbackSrc="/images/payment/placeholder.png"
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {/* Duplicate logos to ensure enough slides for the loop */}
                {paymentMethodsData.logos.map((logo, index) => (
                  <SwiperSlide key={`dup-${index}`}>
                    <div className="payment-methods__slider-item">
                      <ImageWithFallback
                        src={logo}
                        alt={`Payment Method ${index + 1}`}
                        width={120}
                        height={80}
                        fallbackSrc="/images/payment/placeholder.png"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .payment-methods {
          padding: 200px 0;
          background-color: #f8fafc;
        }

        .payment-methods .section__header {
          margin-bottom: 40px;
        }

        .payment-methods .section__header h1 {
          font-size: 2rem;
          color: #1e293b;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .payment-methods__slider-wrapper {
          position: relative;
        }

        .payment-methods__slider-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          height: 120px;
        }

        .payment-methods__slider-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        :global(.payment-methods__slider .swiper-slide) {
          height: auto;
        }

        :global(.payment-methods__slider .swiper-wrapper) {
          align-items: center;
        }

        @media (max-width: 768px) {
          .payment-methods {
            padding: 40px 0;
          }

          .payment-methods__slider-item {
            padding: 15px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentMethodsSlider;
