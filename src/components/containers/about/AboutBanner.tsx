import React from "react";
import Link from "next/link";

interface AboutBannerProps {
  data?: {
    title?: string;
    image?: string;
    breadcrumbs?: {
      text: string;
      link: string;
    }[];
  };
}

const AboutBanner = ({ data }: AboutBannerProps) => {
  // Default data
  const defaultData = {
    title: "Something About Us",
    image: "",
    breadcrumbs: [
      {
        text: "Home",
        link: "/"
      },
      {
        text: "About Us",
        link: "/about-us"
      }
    ]
  };

  // Merge with default data
  const bannerData = {
    ...defaultData,
    ...data,
    breadcrumbs: data?.breadcrumbs || defaultData.breadcrumbs
  };

  return (
    <>
      {/* Full Width Banner Image at Top */}
      {bannerData.image && (
        <section 
          style={{
            width: '100%',
            height: '400px',
            backgroundImage: `url(${bannerData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}></div>
        </section>
      )}

      {/* Text Content Section Below Banner */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1
                data-aos="fade-up"
                data-aos-duration="600"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  textAlign: 'center',
                  margin: '0',
                  padding: '0 20px'
                }}
              >
                {bannerData.title}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutBanner;
