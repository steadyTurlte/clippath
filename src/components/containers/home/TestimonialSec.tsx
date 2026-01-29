import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ImageWithFallback from "@/components/admin/ImageWithFallback";

interface TestimonialData {
    subtitle?: string;
    title?: string;
    items?: {
        name: string;
        role: string;
        content: string;
        image?: {
            url: string;
            publicId: string;
        }
    }[];
}

interface TestimonialSecProps {
    data: TestimonialData;
}

const TestimonialSec = ({ data }: TestimonialSecProps) => {
  console.log("TestimonialSec data:", data);
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  return (
    <section className="testimonial-two section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__header--alt">
                <span className="sub-title">{data.subtitle || "CLIENT'S TESTIMONIAL"}</span>
                <h2 className="title">{data.title || "SOME OF OUR RESPECTED HAPPY CLIENTS SAYS"}</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                loop={true}
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    el: ".testimonial-pagination",
                    clickable: true,
                }}
                className="testimonial-two__slider"
            >
              {data.items.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="testimonial-two__slider-item">
                    <div className="quote">
                        <i className="fa-solid fa-quote-right"></i>
                    </div>
                    <div className="testimonial-content">
                        <p className="text">
                           {testimonial.content}
                        </p>
                        <div className="author-meta">
                            <div className="author-thumb">
                                <ImageWithFallback 
                                    src={testimonial.image?.url || "/images/testimonial/author-one.png"} 
                                    alt={testimonial.name} 
                                    width={78} 
                                    height={78} 
                                />
                            </div>
                            <div className="author-info">
                                <h5 className="author-name">{testimonial.name}</h5>
                                <p className="author-position">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="testimonial-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSec;
