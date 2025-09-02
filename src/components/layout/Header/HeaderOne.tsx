import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import Logo from "public/images/logo.png";

interface HeaderProps {
  openNav: boolean;
  setOpenNav: (value: boolean) => void;
  handleNav: () => void;
}

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  googleMapUrl?: string;
}

const HeaderOne = ({ openNav, handleNav, setOpenNav }: HeaderProps) => {
  // Services for navbar dropdown
  const [services, setServices] = useState<any[]>([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/content/services?section=services");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setServices(data);
        }
      } catch (err) {
        console.error("Error fetching services for navbar:", err);
      }
    };
    fetchServices();
  }, []);
  const [OffInfo, setOffInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "",
    email: "",
    address: "",
  });

  // Fetch settings data from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/content/settings");
        if (response.ok) {
          const data = await response.json();
          if (data.contact) {
            setContactInfo({
              phone: data.contact.phone || "",
              email: data.contact.email || "",
              address: data.contact.address || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleInfo = () => {
    setOffInfo(!OffInfo);
  };

  const closeInfo = () => {
    setOffInfo(false);
  };

  const closeNav = () => {
    setOpenNav(false);
    setOpenSubMenu(null);
  };

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubmenu = (submenu: string) => {
    if (submenu === openSubMenu) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(submenu);
    }
  };

  const isSubMenuOpen = (submenu: string) => {
    return submenu === openSubMenu ? " nav__dropdown-active" : " ";
  };

  const isSubMenuButton = (submenu: string) => {
    return submenu === openSubMenu ? " nav__menu-link--dropdown-active" : " ";
  };

  // window resize
  useEffect(() => {
    const handleResizeHeader = (): void => {
      setOpenNav(false);
      setOpenSubMenu(null);
      setOffInfo(false);
    };

    window.addEventListener("resize", handleResizeHeader);

    return () => {
      window.removeEventListener("resize", handleResizeHeader);
    };
  }, [setOpenNav, setOpenSubMenu, setOffInfo]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let logoSrc = Logo;

  const router = useRouter();

  const defaultClasses = "header";

  const headerClass = "";

  const combinedClasses = `${
    scrolled ? " header-active" : " "
  } ${headerClass} ${defaultClasses}`;

  return (
    <>
      <header className={combinedClasses}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="nav">
                <div className="nav__content">
                  <div className="nav__logo">
                    <Link href="/">
                      <Image priority src={logoSrc} alt="Logo" />
                    </Link>
                    <button
                      aria-label="open sidebar"
                      className={
                        "sidedot" + (OffInfo ? " sidedot-active" : " ")
                      }
                      onClick={handleInfo}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                  <div
                    className={
                      (openNav ? " nav__menu-active" : " ") + " nav__menu"
                    }
                  >
                    <div className="nav__menu-logo d-flex d-xl-none">
                      <Link href="/" className="text-center hide-nav">
                        <Image priority src={Logo} alt="Logo" />
                      </Link>
                      <a className="nav__menu-close" onClick={closeNav}>
                        <i className="fa-solid fa-xmark"></i>
                      </a>
                    </div>
                    <ul className="nav__menu-items">
                      <li className="nav__menu-item">
                        <Link className="nav__menu-link hide-nav" href="/">
                          Home
                        </Link>
                      </li>
                      <li className="nav__menu-item">
                        <Link
                          className="nav__menu-link hide-nav"
                          href="about-us"
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="nav__menu-item nav__menu-item--dropdown">
                        <button
                          aria-label="dropdown menu container"
                          className={`nav__menu-link nav__menu-link--dropdown ${isSubMenuButton(
                            "services"
                          )}`}
                          onClick={() => handleSubmenu("services")}
                        >
                          Services
                        </button>
                        <div
                          className={`nav__dropdown mega-menu ${isSubMenuOpen(
                            "services"
                          )}`}
                        >
                          <div className="mega-menu__inner">
                            <div className="mega-menu__single">
                              <div className="mega-menu__single-head">
                                <h5 className="h5">Popular services</h5>
                              </div>
                              <ul>
                                <li className="mega-menu__single-item">
                                  <Link className="hide-nav" href="/services">
                                    <img
                                      src="/images/services/slide-one.png"
                                      alt="All services"
                                      width={90}
                                      height={44}
                                    />
                                    <span>All services</span>
                                  </Link>
                                </li>
                                {services.map((service) => (
                                  <li className="mega-menu__single-item" key={service.id}>
                                    <Link
                                      className="hide-nav"
                                      href={`/services/${encodeURIComponent(
                                        (service?.title || "")
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")
                                      )}`}
                                    >
                                      <img
                                        src={service?.image || "/images/services/slide-two.png"}
                                        alt={service?.title || "Service"}
                                        width={90}
                                        height={44}
                                      />
                                      <span>{service?.title}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mega-menu__single mega-menu__single--alt">
                              <div className="mega-menu__single-head">
                                <h5 className="h5">Before / After</h5>
                              </div>
                              <div className="mega-menu__single-img">
                                <ReactCompareSlider
                                  itemOne={<ReactCompareSliderImage src="/images/after/one.png" alt="after" />}
                                  itemTwo={<ReactCompareSliderImage src="/images/after/two.png" alt="before" />}
                                  position={50}
                                  style={{ width: "100%", maxWidth: 500 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav__menu-item nav__menu-item--dropdown">
                        <button
                          aria-label="dropdown menu container"
                          className={`nav__menu-link nav__menu-link--dropdown ${isSubMenuButton(
                            "pages"
                          )}`}
                          onClick={() => handleSubmenu("pages")}
                        >
                          Pages
                        </button>
                        <ul
                          className={`nav__dropdown ${isSubMenuOpen("pages")}`}
                        >
                          <li>
                            <Link
                              className="nav__dropdown-item hide-nav"
                              href="portfolio"
                            >
                              Portfolio
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="nav__dropdown-item hide-nav"
                              href="pricing"
                            >
                              Pricing
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="nav__dropdown-item hide-nav"
                              href="teams"
                            >
                              Our Teams
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="nav__dropdown-item hide-nav"
                              href="get-quote"
                            >
                              Get A Quote
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav__menu-item nav__menu-item--dropdown">
                        <button
                          aria-label="dropdown menu container"
                          className={`nav__menu-link nav__menu-link--dropdown ${isSubMenuButton(
                            "blog"
                          )}`}
                          onClick={() => handleSubmenu("blog")}
                        >
                          Blog
                        </button>
                        <ul
                          className={`nav__dropdown ${isSubMenuOpen("blog")}`}
                        >
                          <li>
                            <Link
                              className="nav__dropdown-item hide-nav"
                              href="blog"
                            >
                              Blog
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="nav__dropdown-item hide-nav"
                              href="blog-single"
                            >
                              Blog Single
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav__menu-item">
                        <Link
                          className="nav__menu-link hide-nav"
                          href="contact-us"
                        >
                          Contact
                        </Link>
                      </li>
                      <li className="nav__menu-item d-block d-md-none">
                        <Link href="get-quote" className="btn btn--secondary">
                          Free Trial
                        </Link>
                      </li>
                    </ul>
                    <ul className="social d-flex d-xl-none">
                      <li>
                        <Link href="/" aria-label="social media">
                          <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/" aria-label="social media">
                          <i className="fa-brands fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/" aria-label="social media">
                          <i className="fa-brands fa-pinterest-p"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/" aria-label="social media">
                          <i className="fa-brands fa-instagram"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="nav__uncollapsed">
                    <div className="nav__uncollapsed-item d-none d-md-flex">
                      <Link href="get-quote" className="btn btn--secondary">
                        Free Trial
                      </Link>
                    </div>
                    <button
                      className={
                        (openNav ? " nav__bar-toggle" : " ") +
                        " nav__bar d-block d-xl-none"
                      }
                      onClick={handleNav}
                    >
                      <span className="icon-bar top-bar"></span>
                      <span className="icon-bar middle-bar"></span>
                      <span className="icon-bar bottom-bar"></span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div
          className={(openNav ? " backdrop-active" : " ") + " backdrop"}
          onClick={closeNav}
        ></div>
      </header>
      <div className={"off-canvas" + (OffInfo ? " off-canvas-active" : " ")}>
        <div className="off-canvas__inner">
          <div className="off-canvas__head">
            <Link href="/">
              <Image priority src={Logo} alt="Logo" />
            </Link>
            <button
              aria-label="close off canvas"
              className="off-canvas-close"
              onClick={closeInfo}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="offcanvas__search">
            <form action="#">
              <input
                type="text"
                placeholder="What are you searching for?"
                required
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <div className="off-canvas__contact">
            <h4 className="h4">Contact Info</h4>
            {contactInfo.phone && (
              <div className="single">
                <span>
                  <i className="fa-solid fa-phone-volume"></i>
                </span>
                <Link href={`tel:${contactInfo.phone}`}>
                  {contactInfo.phone}
                </Link>
              </div>
            )}
            {contactInfo.email && (
              <div className="single">
                <span>
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <Link href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </Link>
              </div>
            )}
            {contactInfo.address && (
              <div className="single">
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <Link href={contactInfo.googleMapUrl || "#"} target="_blank">
                  {contactInfo.address}
                </Link>
              </div>
            )}
          </div>
          <ul className="social-side">
            <li>
              <Link href="/" aria-label="social media">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link href="/" aria-label="social media">
                <i className="fa-brands fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link href="/" aria-label="social media">
                <i className="fa-brands fa-pinterest-p"></i>
              </Link>
            </li>
            <li>
              <Link href="/" aria-label="social media">
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          "off-canvas-backdrop" +
          (OffInfo ? " off-canvas-backdrop-active" : " ")
        }
        onClick={closeInfo}
      ></div>
    </>
  );
};

export default HeaderOne;
