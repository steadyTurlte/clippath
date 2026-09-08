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
  // Per-service detail content keyed by slug
  details: {},
  // Service details page banner (applies to all service detail pages)
  detailsBanner: {
    image: ""
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { section, slug } = req.query;
      let data = await getData("services");
      if (!data) {
        data = {};
      }
      if (section) {
        // Handle service details banner
        if (section === "detailsBanner") {
          return res.status(200).json(data.detailsBanner || { image: "" });
        }
        // Handle dynamic service details
        if (section === "details") {
          const key = typeof slug === 'string' ? slug : '';
          if (!key) {
            // Return all details map if slug missing
            return res.status(200).json(data.details || {});
          }
          const detail = (data.details && data.details[key]) || null;
          return res.status(200).json(detail || null);
        }
        if (section === "sponsors") {
          const aboutData = await getData("about");
          if (aboutData && aboutData.sponsors) {
            return res.status(200).json(aboutData.sponsors);
          }
        }
        if (section === "pricing") {
          const pricingData = await getData("pricing");
          if (pricingData && pricingData.main) {
            return res.status(200).json(pricingData.main);
          }
        }
        if (section === "services") {
          return res.status(200).json(data.services || []);
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
      const { section, slug } = req.query;
      const updatedData = req.body;
      let data = (await getData("services")) || {};
      if (section) {
        if (section === "detailsBanner") {
          data = {
            ...data,
            detailsBanner: updatedData,
          };
          const success = await saveData("services", data);
          if (!success) {
            return res.status(500).json({ message: "Failed to save service details banner" });
          }
          return res.status(200).json({ message: "Service details banner updated successfully", data: data.detailsBanner });
        }
        if (section === "details") {
          const key = typeof slug === 'string' ? slug : '';
          if (!key) {
            return res.status(400).json({ message: "Slug is required to update details" });
          }
          const current = data.details || {};
          data = {
            ...data,
            details: {
              ...current,
              [key]: updatedData,
            },
          };
          const success = await saveData("services", data);
          if (!success) {
            return res.status(500).json({ message: "Failed to save service details" });
          }
          return res.status(200).json({ message: "Service details updated successfully", data: data.details[key] });
        }
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
        if (section === "items-and-details") {
          const { services, details } = updatedData;

          if (!services || !details) {
            return res.status(400).json({ message: "Both services and details are required" });
          }

          // Check for duplicate service titles
          const titlesSet = new Set();
          for (const s of services) {
            const normTitle = (s.title || '').trim().toLowerCase();
            if (titlesSet.has(normTitle)) {
              return res.status(400).json({ message: `A service with the name "${s.title}" already exists.` });
            }
            titlesSet.add(normTitle);
          }

          // Deep merge details only for active services present in incoming details
          const mergedDetails = {};
          Object.keys(details).forEach(slugKey => {
            const existing = (data.details && data.details[slugKey]) || {};
            const incoming = details[slugKey] || {};

            // Merge hero preserving non-empty existing values if incoming is blank
            const heroMerged = {
              title: incoming.hero?.title || existing.hero?.title || '',
              subtitle: incoming.hero?.subtitle || existing.hero?.subtitle || '',
              description: incoming.hero?.description || existing.hero?.description || '',
              beforeImage: incoming.hero?.beforeImage?.url ? incoming.hero.beforeImage : (existing.hero?.beforeImage || { url: '', publicId: '' }),
              afterImage: incoming.hero?.afterImage?.url ? incoming.hero.afterImage : (existing.hero?.afterImage || { url: '', publicId: '' }),
            };

            const projectsMerged = (Array.isArray(incoming.projects) && incoming.projects.length > 0)
              ? incoming.projects
              : (Array.isArray(existing.projects) ? existing.projects : []);

            const faqsMerged = Array.isArray(incoming.faqs)
              ? incoming.faqs
              : (Array.isArray(existing.faqs) ? existing.faqs : []);

            mergedDetails[slugKey] = {
              ...existing,
              ...incoming,
              hero: heroMerged,
              projects: projectsMerged,
              faqs: faqsMerged
            };
          });

          // Update both services list and details map
          data = {
            ...data,
            services: services,
            details: mergedDetails
          };

          const success = await saveData("services", data);
          if (!success) {
            return res.status(500).json({ message: "Failed to save services and details" });
          }
          return res.status(200).json({ message: "Services and details updated successfully", data });
        }

        data = {
          ...data,
          [section]: updatedData,
        };
      } else {
        const currentPricing = data.pricing;
        const currentDetails = data.details || {};
        const aboutData = await getData("about");
        const sponsors = aboutData && aboutData.sponsors ? aboutData.sponsors : data.sponsors;
        data = {
          ...updatedData,
          pricing: currentPricing,
          sponsors: sponsors,
          details: {
            ...currentDetails,
            ...(updatedData.details || {})
          }
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
  if (req.method === "POST") {
    try {
      const { service, details } = req.body;
      if (!service || !service.title) {
        return res.status(400).json({ message: "Service title is required" });
      }

      let data = (await getData("services")) || {};
      const services = Array.isArray(data.services) ? data.services : [];
      const currentDetails = data.details || {};

      // Check if service title already exists (case-insensitive)
      const isDuplicate = services.some(
        (s) => (s.title || '').trim().toLowerCase() === (service.title || '').trim().toLowerCase()
      );
      if (isDuplicate) {
        return res.status(400).json({ message: `A service with the name "${service.title}" already exists.` });
      }

      const slugify = (text) =>
        (text || '')
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-');

      const slug = slugify(service.title);
      const newId = service.id || Date.now();

      const newService = {
        id: newId,
        title: service.title,
        price: service.price || '',
        description: service.description || '',
        image: service.image || '',
        link: service.link || 'service-details',
        className: service.className || 'on'
      };

      const updatedServices = [...services, newService];
      const updatedDetails = {
        ...currentDetails,
        [slug]: details || {
          hero: { title: '', subtitle: '', description: '', beforeImage: { url: '', publicId: '' }, afterImage: { url: '', publicId: '' } },
          projects: [],
          faqs: []
        }
      };

      data = {
        ...data,
        services: updatedServices,
        details: updatedDetails
      };

      const success = await saveData("services", data);
      if (!success) {
        return res.status(500).json({ message: "Failed to create service" });
      }

      return res.status(201).json({ message: "Service created successfully", service: newService, slug });
    } catch (error) {
      console.error("Error creating service:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id, slug } = req.query;
      if (!id && !slug) {
        return res.status(400).json({ message: "Service ID or slug is required for deletion" });
      }

      let data = (await getData("services")) || {};
      let services = Array.isArray(data.services) ? data.services : [];
      let detailsMap = { ...(data.details || {}) };

      const slugify = (text) =>
        (text || '')
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-');

      let targetSlug = slug;
      if (!targetSlug && id) {
        const found = services.find((s) => String(s.id) === String(id));
        if (found) {
          targetSlug = slugify(found.title);
        }
      }

      services = services.filter((s) => String(s.id) !== String(id) && slugify(s.title) !== targetSlug);
      if (targetSlug && detailsMap[targetSlug]) {
        delete detailsMap[targetSlug];
      }

      data = {
        ...data,
        services: services,
        details: detailsMap
      };

      const success = await saveData("services", data);
      if (!success) {
        return res.status(500).json({ message: "Failed to delete service" });
      }

      return res.status(200).json({ message: "Service deleted successfully", id, slug: targetSlug });
    } catch (error) {
      console.error("Error deleting service:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
