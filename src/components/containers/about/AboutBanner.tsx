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
      {/* Banner Image Section - Only if image exists */}
      {bannerData.image && (
        <section 
          className="about-banner-image" 
          style={{
            backgroundImage: `url(${bannerData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '450px',
            position: 'relative',
            width: '100%'
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

      {/* Title and Breadcrumbs Section - Completely separate below banner */}
      <section className="about-banner-content section" style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: '#ffffff'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-7">
              <h1
                className="h1 title"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
                style={{ 
                  marginBottom: '20px'
                }}
              >
                {bannerData.title}
              </h1>
            </div>
            <div className="col-12 col-lg-5">
              <nav aria-label="breadcrumb">
                <ol
                  className="breadcrumb justify-content-lg-end"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="150"
                >
                  {bannerData.breadcrumbs.map((breadcrumb, index) => (
                    index === bannerData.breadcrumbs.length - 1 ? (
                      <li
                        key={index}
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {breadcrumb.text}
                      </li>
                    ) : (
                      <li key={index} className="breadcrumb-item">
                        <Link href={breadcrumb.link}>
                          {breadcrumb.text}
                        </Link>
                      </li>
                    )
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="left-triangle">
          <div className="triangle"></div>
        </div>
        <div className="right-triangle">
          <div className="triangle"></div>
          <div className="right-alt"></div>
        </div>
      </section>
    </>
  );
};

export default AboutBanner;
