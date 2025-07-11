import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/Banner/CmnBanner";
import PortfolioMain from "@/components/containers/portfolio/PortfolioMain";
import PortfolioPopup from "@/components/containers/portfolio/PortfolioPopup";
import PortfolioSponsorSlider from "@/components/containers/portfolio/PortfolioSponsorSlider";

interface PortfolioProps {
  portfolioData: {
    banner?: {
      title?: string;
      image?: string;
      breadcrumbs?: { text: string; link: string }[];
    };
    video?: {
      embedId?: string;
      backgroundImage?: string;
    };
    categories?: any;
    items?: any;
    sponsors?: any;
  };
  settings: any;
}

const Portfolio = ({ portfolioData, settings }: PortfolioProps) => {
  return (
    <Layout settings={settings}>
      <CmnBanner
        title={portfolioData?.banner?.title || "Portfolio"}
        image={portfolioData?.banner?.image}
        breadcrumbs={portfolioData?.banner?.breadcrumbs}
      />
      <PortfolioMain data={portfolioData} />
      <PortfolioPopup data={portfolioData?.video} />
      <PortfolioSponsorSlider data={portfolioData?.sponsors} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch portfolio data from API
    const portfolioResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/portfolio`
    );
    const portfolioData = await portfolioResponse.json();

    // Fetch settings data from API
    const settingsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/settings`
    );
    const settings = await settingsResponse.json();

    // Fetch sponsors data from about.json
    const sponsorsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/about?section=sponsors`
    );
    if (sponsorsResponse.ok) {
      const sponsorsData = await sponsorsResponse.json();
      // Update portfolio data with sponsors from about.json
      portfolioData.sponsors = sponsorsData;
    }

    return {
      props: {
        portfolioData,
        settings,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    // Return default empty data to prevent rendering errors
    return {
      props: {
        portfolioData: {},
        settings: {},
      },
    };
  }
};

export default Portfolio;
