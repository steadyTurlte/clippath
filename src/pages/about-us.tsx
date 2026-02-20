import React from "react";
import Layout from "@/components/layout/Layout";
import AboutBanner from "@/components/containers/about/AboutBanner";
import AboutOverview from "@/components/containers/about/AboutOverview";
import AboutMain from "@/components/containers/about/AboutMain";
import AboutSponsor from "@/components/containers/about/AboutSponsor";
import AboutTeam from "@/components/containers/about/AboutTeam";
import AboutFaq from "@/components/containers/about/AboutFaq";
import TestimonialSec from "@/components/containers/home/TestimonialSec";
import AboutCta from "@/components/containers/about/AboutCta";
import { GetServerSideProps } from "next";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch about page data
    console.log("Fetching about page data...",process.env.NEXT_PUBLIC_API_URL);
    const aboutResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/about`
    );
    const aboutData = aboutResponse.ok ? await aboutResponse.json() : {};

    // Fetch team data from dedicated teams endpoint
    const teamResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/teams?section=team`
    );
    const teamData = teamResponse.ok ? await teamResponse.json() : {};

    // Fetch testimonials data from dedicated testimonials endpoint
    const testimonialsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/testimonials`
    );
    const testimonials = testimonialsResponse.ok ? await testimonialsResponse.json() : {};

    // Fetch settings data
    const settingsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/settings`
    );
    const settings = settingsResponse.ok ? await settingsResponse.json() : {};

    // Fetch portfolio data
    const portfolioResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/portfolio`
    );
    const portfolio = portfolioResponse.ok ? await portfolioResponse.json() : {};

    return {
      props: {
        aboutData,
        teamData,
        testimonials,
        settings,
        portfolio,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    // Return default empty data to prevent rendering errors
    return {
      props: {
        aboutData: null,
        teamData: null,
        testimonials: null,
        settings: null,
        portfolio: null,
      },
    };
  }
};

interface AboutUsProps {
  aboutData?: any;
  teamData?: any;
  testimonials?: any;
  settings?: any;
  portfolio?: any;
}

const AboutUs = ({
  aboutData,
  teamData,
  testimonials,
  settings,
  portfolio,
}: AboutUsProps) => {
  // Use the data from the API to render the components
  return (
    <Layout settings={settings}>
      <AboutBanner data={aboutData?.banner} />
      <AboutOverview data={aboutData?.overview} />
      <AboutMain data={aboutData?.main} />
      <AboutSponsor data={aboutData?.sponsors} />
      <AboutTeam data={teamData} />
      <AboutFaq data={aboutData?.faq} />
      <TestimonialSec data={testimonials} />
      <AboutCta data={aboutData?.cta} />
    </Layout>
  );
};

export default AboutUs;
