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
  // Return null if no data
  if (!data) return null;

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

  const image1 = getImageUrl(overviewData.images[0], One);
  const image2 = getImageUrl(overviewData.images[1], Two);

  return (
    <section className="about-overview section">
      <div className="container">
        <div className="row align-items-center">
          {/* Images Column */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="overview-images">
              <div className="row g-3">
                <div className="col-6">
                  <ImageWithFallback
                    src={image1}
                    alt="Overview Image 1"
                    width={300}
                    height={400}
                    className="img-fluid rounded shadow-sm"
                    fallbackSrc={typeof One === 'string' ? One : One.src}
                  />
                </div>
                <div className="col-6">
                  <ImageWithFallback
                    src={image2}
                    alt="Overview Image 2"
                    width={300}
                    height={400}
                    className="img-fluid rounded shadow-sm"
                    fallbackSrc={typeof Two === 'string' ? Two : Two.src}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-6">
            <div className="overview-content ps-lg-4">
              {overviewData.title && (
                <h2 className="title mb-4">{overviewData.title}</h2>
              )}
              
              {overviewData.description && (
                <p className="mb-4">
                  {overviewData.description}
                </p>
              )}

              {overviewData.mission && (
                <div className="mission-statement mt-4">
                  <h4 className="sub-title mb-3">Our Mission</h4>
                  <p>{overviewData.mission}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;
