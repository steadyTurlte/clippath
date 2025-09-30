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
      {/* Banner Image Section */}
      {bannerData.image && (
        <section 
          className="about-banner-image" 
          style={{
            backgroundImage: `url(${bannerData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '400px',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}></div>
        </section>
      )}

      {/* Title and Breadcrumbs Section */}
      <section className="about-banner-content" style={{
        padding: '60px 0',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderBottom: '3px solid #007bff'
      }}>
        <div className="container">
          <div className="row gaper align-items-center">
            <div className="col-12 col-lg-8 text-center text-lg-start">
              <h1
                className="title"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
                style={{ 
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#1a1a2e',
                  marginBottom: '0',
                  textTransform: 'capitalize',
                  letterSpacing: '1px'
                }}
              >
                {bannerData.title}
              </h1>
            </div>
            <div className="col-12 col-lg-4">
              <nav aria-label="breadcrumb">
                <ol
                  className="breadcrumb justify-content-center justify-content-lg-end"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="150"
                  style={{ 
                    backgroundColor: 'transparent',
                    padding: '0',
                    marginBottom: '0'
                  }}
                >
                  {bannerData.breadcrumbs.map((breadcrumb, index) => (
                    index === bannerData.breadcrumbs.length - 1 ? (
                      <li
                        key={index}
                        className="breadcrumb-item active"
                        aria-current="page"
                        style={{ 
                          color: '#007bff',
                          fontWeight: '600',
                          fontSize: '1.1rem'
                        }}
                      >
                        {breadcrumb.text}
                      </li>
                    ) : (
                      <li key={index} className="breadcrumb-item">
                        <Link
                          href={breadcrumb.link}
                          style={{ 
                            color: '#555',
                            textDecoration: 'none',
                            fontWeight: '500',
                            fontSize: '1.1rem',
                            transition: 'color 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#007bff'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                        >
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
      </section>
    </>
  );
};

export default AboutBanner;
