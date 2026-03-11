import React, { Fragment, useState } from "react";
import Head from "next/head";
import HeaderOne from "./Header/HeaderOne";
import FooterOne from "./Footer/FooterOne";
import ScrollProgressBtn from "./ScrollProgressBtn/ScrollProgressBtn";
import { GoogleTagManager } from "@next/third-parties/google";

type LayoutProps = {
  children: React.ReactNode;
  settings?: any;
  title?: string;
  description?: string;
  keywords?: string;
};

const Layout = ({
  children,
  settings,
  title = "Image retouching pro",
  description = "Professional photo editing services for e-commerce businesses and photographers",
  keywords = "image retouching, photo editing, edit, react",
}: LayoutProps) => {
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () => {
    setOpenNav(!openNav);
  };

  const combinedClasses = "my-app";

  return (
    <Fragment>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Pinterest domain verification */}
        <meta
          name="p:domain_verify"
          content="32d859ed3d2fc0041ca6745c0b1b0e42"
        />

        <link
          rel="shortcut icon"
          href={settings?.site?.favicon || "/favicon.png"}
          type="image/x-icon"
        />

        <title>{settings?.site?.title || title}</title>

        <meta
          name="keywords"
          content={settings?.site?.keywords || keywords}
        />

        <meta
          name="description"
          content={settings?.site?.description || description}
        />

        {/* OpenGraph SEO (recommended) */}
        <meta property="og:title" content={settings?.site?.title || title} />
        <meta
          property="og:description"
          content={settings?.site?.description || description}
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className={`${combinedClasses}${openNav ? " body-active" : " "}`}>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M75FF4DQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <HeaderOne
          openNav={openNav}
          handleNav={handleNav}
          setOpenNav={setOpenNav}
        />

        <main>{children}</main>

        <FooterOne />

        <ScrollProgressBtn />
      </div>

      {/* Google Tag Manager script */}
      <GoogleTagManager gtmId="GTM-M75FF4DQ" />
    </Fragment>
  );
};

export default Layout;