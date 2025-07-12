import React from "react";
import ImageWithFallback from "@/components/admin/ImageWithFallback";
import One from "public/images/about/about-overview-one.png";
import Two from "public/images/about/about-overview-two.png";

interface AboutOverviewProps {
  data: {
    images: string[];
    title: string;
    description: string;
    mission: string;
  };
}

const AboutOverview = ({ data }: AboutOverviewProps) => {
  // Helper function to extract image URL from various formats
  const getImageUrl = (imageData: any, fallback: any) => {
    if (!imageData) return fallback;

    // If it's a string, return it directly
    if (typeof imageData === "string") return imageData;

    // If it's an object with url property
    if (typeof imageData === "object" && imageData.url) return imageData.url;

    // If it's an object with src property
    if (typeof imageData === "object" && imageData.src) return imageData.src;

    // Fallback
    return fallback;
  };

  const overviewData = {
    ...data,
    images: data.images || [],
  };
  return (
    <section className="about-overview section pt-0">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-lg-7">
            <div
              className="about-overview__single "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <ImageWithFallback
                src={getImageUrl(overviewData.images[0], One)}
                alt="Overview Image 1"
                width={600}
                height={400}
                fallbackSrc="/images/about/about-overview-one.png"
              />
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div
              className="about-overview__single "
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <ImageWithFallback
                src={getImageUrl(overviewData.images[1], Two)}
                alt="Overview Image 2"
                width={400}
                height={300}
                fallbackSrc="/images/about/about-overview-two.png"
              />
            </div>
          </div>
        </div>
        <div className="row gaper">
          <div className="col-12 col-lg-6">
            <h2
              className="h2 title "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              {overviewData.title}
            </h2>
          </div>
          <div className="col-12 col-lg-6">
            <div
              className="paragraph "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <p>{overviewData.description}</p>
              <p className="h6">Our Mission</p>
              <p>{overviewData.mission}</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .about-overview {
          color: #fff;
        }
        .about-overview .title,
        .about-overview .h2,
        .about-overview .h6 {
          color: #fff;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7),
            0 1px 3px rgba(0, 0, 0, 0.9), 1px 1px 0 rgba(0, 0, 0, 0.8),
            -1px -1px 0 rgba(0, 0, 0, 0.8), 1px -1px 0 rgba(0, 0, 0, 0.8),
            -1px 1px 0 rgba(0, 0, 0, 0.8);
          font-weight: 600;
        }
        .about-overview .paragraph p {
          color: #fff;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8),
            0 1px 2px rgba(0, 0, 0, 0.9), 1px 1px 0 rgba(0, 0, 0, 0.7),
            -1px -1px 0 rgba(0, 0, 0, 0.7), 1px -1px 0 rgba(0, 0, 0, 0.7),
            -1px 1px 0 rgba(0, 0, 0, 0.7);
          font-weight: 500;
        }
        .about-overview__single {
          /* Add overlay for better text contrast over images */
          position: relative;
        }
        .about-overview__single::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.15);
          z-index: 1;
          pointer-events: none;
        }
        .about-overview__single img {
          filter: brightness(0.8) contrast(1.1);
          position: relative;
          z-index: 0;
        }
        .about-overview .title,
        .about-overview .h2,
        .about-overview .h6,
        .about-overview .paragraph {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </section>
  );
};

export default AboutOverview;
