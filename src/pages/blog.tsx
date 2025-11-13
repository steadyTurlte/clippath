import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/Banner/CmnBanner";
import DynamicBlogMain from "@/components/containers/DynamicBlogMain";

interface BlogProps {
  settings: any;
  blogSettings: any;
}

const Blog = ({ settings, blogSettings }: BlogProps) => {
  const bannerImage =
    blogSettings?.bannerImage ||
    blogSettings?.pageBanner?.image ||
    blogSettings?.heroImage ||
    blogSettings?.hero?.image;

  return (
    <Layout settings={settings}>
      {bannerImage && (
        <CmnBanner
          title={blogSettings?.pageTitle || "Blog"}
          image={bannerImage}
          hideContent
          overlayOpacity={0}
        />
      )}
      <DynamicBlogMain />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch settings data from API
    const settingsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/settings`
    );
    const settings = await settingsResponse.json();

    // Fetch blog settings from API
    const blogSettingsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/content/blog-settings`
    );
    const blogSettings = blogSettingsResponse.ok
      ? await blogSettingsResponse.json()
      : {
          pageTitle: "Blog",
          pageDescription: "Latest news and updates from our team",
        };

    return {
      props: {
        settings,
        blogSettings,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    // Return default empty data to prevent rendering errors
    return {
      props: {
        settings: {},
        blogSettings: {
          pageTitle: "Blog",
          pageDescription: "Latest news and updates from our team",
        },
      },
    };
  }
};

export default Blog;
