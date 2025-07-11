import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/Banner/CmnBanner";
import SponsorSlider from "@/components/containers/home/SponsorSlider";
import TeamMainSec from "@/components/containers/TeamMainSec";

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch teams data from API
    const teamsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/teams`
    );
    const teamsData = await teamsResponse.json();

    // Fetch settings data from API
    const settingsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/settings`
    );
    const settings = await settingsResponse.json();

    // Fetch sponsors data from about API
    const sponsorsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/about?section=sponsors`
    );
    if (sponsorsResponse.ok) {
      const sponsorsData = await sponsorsResponse.json();
      // Update teams data with sponsors from about.json
      teamsData.sponsors = sponsorsData;
    }

    return {
      props: {
        teamsData,
        settings,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    // Return default empty data to prevent rendering errors
    return {
      props: {
        teamsData: {},
        settings: {},
      },
    };
  }
};

interface TeamsProps {
  teamsData: {
    banner?: {
      title?: string;
      image?: string;
      breadcrumbs?: any[];
    };
    team?: any;
    sponsors?: any;
  };
  settings: any;
}

const Teams = ({ teamsData = {}, settings = {} }: TeamsProps) => {
  return (
    <Layout settings={settings}>
      <CmnBanner
        title={teamsData.banner?.title || "Our Teams"}
        image={teamsData.banner?.image}
        breadcrumbs={teamsData.banner?.breadcrumbs}
      />
      <TeamMainSec teamData={teamsData.team} />
      <SponsorSlider data={teamsData.sponsors} />
    </Layout>
  );
};

export default Teams;
