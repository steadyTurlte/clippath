import React from "react";
import Image from "next/image";
import Link from "next/link";
import ctaThumb from "public/images/cta-thumb.png";

interface CTAData {
  title: string;
  description: string;
  image?: string;
}

interface CTAProps {
  data: CTAData;
}

const CTA = ({ data }: CTAProps) => {
  // Helper function to extract image URL from various formats
  const getImageUrl = (imageData: any) => {
    if (!imageData) return undefined;
    
    // If it's a string, return it directly
    if (typeof imageData === "string") return imageData;
    
    // If it's an object with url property
    if (typeof imageData === "object" && imageData.url) return imageData.url;
    
    // If it's an object with src property
    if (typeof imageData === "object" && imageData.src) return imageData.src;
    
    return undefined;
  };

  const imageUrl = getImageUrl(data?.image);
  const isLocalImage = typeof imageUrl === "string" && imageUrl.startsWith("/images/");

  // Defensive fallback for missing data or image
  const ctaData = {
    title: data?.title || "Ready to Get Started?",
    description: data?.description || "Transform your images today!",
    image: imageUrl,
  };

  return (
    <section className="try-cta bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <div className="try-cta__inner">
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-6">
                  <div className="try-cta__thumb ">
                    {ctaData.image ? (
                      <Image
                        src={ctaData.image}
                        alt="CTA Image"
                        width={600}
                        height={400}
                        unoptimized={isLocalImage}
                      />
                    ) : (
                      <Image src={ctaThumb} alt="Default CTA Image" />
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="try-cta__content section__content">
                    <h2 className="h2 title ">{ctaData.title}</h2>
                    <div className="paragraph ">
                      <p>{ctaData.description}</p>
                    </div>
                    <div className="cta__group ">
                      <Link href="/get-quote" className="btn btn--secondary text-dark">
                        Free Trial<i className="fa-solid fa-paper-plane"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
