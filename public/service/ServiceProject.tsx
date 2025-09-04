import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface ServiceProjectProps {
  serviceData?: any;
  projectsData?: any;
}

const ServiceProject = ({ serviceData, projectsData }: ServiceProjectProps) => {
  // Use service-specific projects if available, otherwise fallback to default
  let projects = [];
  
  if (Array.isArray(projectsData)) {
    projects = projectsData;
  } else if (projectsData?.projects && Array.isArray(projectsData.projects)) {
    projects = projectsData.projects;
  } else {
    // Default fallback projects
    projects = [
      { id: 1, image: "/images/project-one.png", title: "Project 1" },
      { id: 2, image: "/images/project-two.png", title: "Project 2" },
      { id: 3, image: "/images/project-three.png", title: "Project 3" },
    ];
  }
  return (
    <section className="section project-three">
      <div className="container">
        <div className="row align-items-center section__header--alt">
          <div className="col-12 col-lg-7">
            <div className="section__header">
              <p
                className="h6 sub-title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                recent completed projects
              </p>
              <h2
                className="h2 title "
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
              >
                {serviceData?.title ? `${serviceData.title} Projects` : "Beautiful Projects"}
              </h2>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="project-three-pagination slick-pagination justify-content-lg-end"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="project-three__slider-wrapper">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={1200}
                loop={true}
                modules={[Autoplay, Pagination]}
                pagination={{
                  el: ".project-three-pagination",
                  clickable: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  1200: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                }}
                className="project-three__slider"
              >
                {projects.map((project: any, index: number) => (
                  <SwiperSlide key={project.id || index}>
                    <div className="project-three__slider-item">
                      <Image 
                        src={project.image || "/images/project-one.png"} 
                        alt={project.title || "Project"} 
                        width={400}
                        height={300}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                {/* Add duplicates for loop effect if we have less than 6 items */}
                {projects.length < 6 && projects.map((project: any, index: number) => (
                  <SwiperSlide key={`duplicate-${project.id || index}`}>
                    <div className="project-three__slider-item">
                      <Image 
                        src={project.image || "/images/project-one.png"} 
                        alt={project.title || "Project"} 
                        width={400}
                        height={300}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="section__cta">
              <Link
                href="/contact-us"
                aria-label="get started"
                className="btn btn--primary"
              >
                get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProject;
