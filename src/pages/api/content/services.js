import { getData, saveData } from "@/utils/dataUtils";

// Default data for the services page
const defaultServicesData = {
  banner: {
    title: "Our Services",
    image: "",
    breadcrumbs: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Services",
        link: "/services",
      },
    ],
  },
  main: {
    subtitle: "our services",
    title: "We're Good at Best Clipping Path Service",
    description:
      "We provide high-quality photo editing services tailored to your specific needs. Our team of expert editors ensures that every image is processed with precision and care.",
  },
  services: [
    {
      id: 1,
      title: "Clipping Path",
      image: "/images/services/slide-one.png",
      price: "$0.39 Only",
      description:
        "Our clipping path service precisely outlines and isolates objects in your images, allowing for clean background removal and replacement.",
      link: "service-details",
      className: "on",
    },
    {
      id: 2,
      title: "Background Removal",
      image: "/images/services/slide-two.png",
      price: "$0.39 Only",
      description:
        "We can remove any background from your product images, replacing it with white, transparent, or any color of your choice.",
      link: "service-details",
      className: "fi",
    },
    {
      id: 3,
      title: "Image Masking",
      image: "/images/services/slide-three.png",
      price: "$0.39 Only",
      description:
        "Perfect for complex edges like hair or fur, our image masking service preserves fine details while removing backgrounds.",
      link: "service-details",
      className: "tw",
    },
    {
      id: 4,
      title: "Shadow Creation",
      image: "/images/services/slide-four.png",
      price: "$0.39 Only",
      description:
        "We can add natural-looking shadows to your product images, creating depth and realism for a professional appearance.",
      link: "service-details",
      className: "th",
    },
    {
      id: 5,
      title: "Ghost Mannequin",
      image: "/images/services/slide-five.png",
      price: "$0.39 Only",
      description:
        "Our ghost mannequin service creates a 3D hollow effect for clothing items, showing both exterior and interior details.",
      link: "service-details",
      className: "fo",
    },
  ],
  features: {
    subtitle: "our features",
    title: "Why Choose Our Services",
    items: [
      {
        id: 1,
        icon: "icon-clipping",
        title: "Precision Editing",
        description:
          "Our team of expert editors ensures pixel-perfect precision for every image.",
      },
      {
        id: 2,
        icon: "icon-masking",
        title: "Quick Turnaround",
        description:
          "We deliver high-quality edits within 24 hours for standard orders.",
      },
      {
        id: 3,
        icon: "icon-retouching",
        title: "Affordable Pricing",
        description:
          "Competitive rates starting at just $0.39 per image with volume discounts.",
      },
      {
        id: 4,
        icon: "icon-shadow",
        title: "Dedicated Support",
        description:
          "Our customer service team is available 24/7 to assist with any questions.",
      },
    ],
  },
  pricing: {
    subtitle: "pricing plans",
    title: "Choose the Right Plan for You",
    plans: [
      {
        id: 1,
        name: "Basic",
        price: "$0.39",
        unit: "per image",
        description: "Perfect for simple product images",
        features: [
          "Basic Clipping Path",
          "Simple Background Removal",
          "24-hour turnaround",
          "Email support",
          "100% quality guarantee",
        ],
        recommended: false,
      },
      {
        id: 2,
        name: "Standard",
        price: "$0.69",
        unit: "per image",
        description: "Ideal for most e-commerce products",
        features: [
          "Complex Clipping Path",
          "Background Removal",
          "Shadow Creation",
          "Basic Retouching",
          "12-hour turnaround",
          "Priority support",
          "100% quality guarantee",
        ],
        recommended: true,
      },
      {
        id: 3,
        name: "Premium",
        price: "$0.99",
        unit: "per image",
        description: "For complex images requiring detailed work",
        features: [
          "Advanced Clipping Path",
          "Image Masking",
          "Ghost Mannequin Effect",
          "Color Correction",
          "Advanced Retouching",
          "6-hour turnaround",
          "Dedicated account manager",
          "100% quality guarantee",
        ],
        recommended: false,
      },
    ],
  },
  testimonials: {
    subtitle: "testimonials",
    title: "What Our Clients Say",
    items: [
      {
        id: 1,
        name: "Kathryn Murphy",
        position: "CEO, Founder",
        image: "/images/testimonial/one.png",
        rating: 5,
        text: "Photodit is a fantastic service for anyone looking to enhance their product photography. The team is professional, responsive, and delivers high-quality results consistently.",
      },
      {
        id: 2,
        name: "Leslie Alexander",
        position: "Marketing Director",
        image: "/images/testimonial/two.png",
        rating: 5,
        text: "I've been using Photodit for all my e-commerce product images, and the results have been outstanding. Their attention to detail and quick turnaround time have helped me improve my online store significantly.",
      },
      {
        id: 3,
        name: "Jenny Wilson",
        position: "Product Manager",
        image: "/images/testimonial/three.png",
        rating: 5,
        text: "The team at Photodit has been instrumental in helping us maintain a consistent look across all our product images. Their clipping path service is precise and their customer service is excellent.",
      },
    ],
  },
  sponsors: {
    title: "Trusted by Leading Brands",
    logos: [
      "/images/sponsor/one.png",
      "/images/sponsor/two.png",
      "/images/sponsor/three.png",
      "/images/sponsor/four.png",
      "/images/sponsor/five.png",
    ],
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { section } = req.query;
      let data = await getData("services");
      if (!data || Object.keys(data).length === 0) {
        await saveData("services", defaultServicesData);
        data = { ...defaultServicesData };
      }
      if (section) {
        if (section === "sponsors") {
          const aboutData = await getData("about");
          if (aboutData && aboutData.sponsors) {
            return res.status(200).json(aboutData.sponsors);
          }
        }
        if (section === "pricing") {
          const pricingData = await getData("pricing");
          if (pricingData && pricingData.main) {
            data.pricing = pricingData.main;
            await saveData("services", data);
            return res.status(200).json(pricingData.main);
          }
        }
        if (!data[section] && defaultServicesData[section]) {
          data[section] = defaultServicesData[section];
          await saveData("services", data);
          return res.status(200).json(defaultServicesData[section]);
        }
        return res.status(200).json(data[section] || {});
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching services page data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  if (req.method === "PUT") {
    try {
      const { section } = req.query;
      const updatedData = req.body;
      let data = (await getData("services")) || {};
      if (section) {
        if (section === "pricing") {
          return res.status(403).json({
            message: "Pricing data can only be updated from the central pricing page",
            redirectTo: "/admin/pricing/plans",
          });
        }
        if (section === "sponsors") {
          return res.status(403).json({
            message: "Sponsors data can only be updated from the about page",
            redirectTo: "/admin/about/sponsors",
          });
        }
        data = {
          ...data,
          [section]: updatedData,
        };
      } else {
        const currentPricing = data.pricing;
        const aboutData = await getData("about");
        const sponsors = aboutData && aboutData.sponsors ? aboutData.sponsors : data.sponsors;
        data = {
          ...updatedData,
          pricing: currentPricing,
          sponsors: sponsors,
        };
      }
      const success = await saveData("services", data);
      if (!success) {
        return res.status(500).json({ message: "Failed to save services page data" });
      }
      return res.status(200).json({ message: "Services page data updated successfully", data });
    } catch (error) {
      console.error("Error updating services page data:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
