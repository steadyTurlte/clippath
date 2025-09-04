import { getData, saveData } from "@/utils/dataUtils";

// Default service details template
const defaultServiceDetails = {
  about: {
    title: "About This Service",
    description: "Detailed description of the service.",
    features: [
      "Feature 1 description",
      "Feature 2 description",
      "Feature 3 description"
    ],
    image: "/images/services/placeholder.jpg"
  },
  projects: [
    {
      id: 1,
      title: "Project 1",
      description: "Project 1 description",
      beforeImage: "/images/before/placeholder.jpg",
      afterImage: "/images/after/placeholder.jpg"
    },
    {
      id: 2,
      title: "Project 2",
      description: "Project 2 description",
      beforeImage: "/images/before/placeholder.jpg",
      afterImage: "/images/after/placeholder.jpg"
    }
  ],
  pricing: {
    subtitle: "Pricing Plans",
    title: "Affordable Pricing Plans",
    description: "Choose the plan that fits your needs",
    plans: [
      {
        id: 1,
        name: "Basic",
        price: "$0.39",
        unit: "per image",
        description: "Perfect for small projects",
        features: [
          "Background Removal",
          "24-48h Delivery",
          "2 Free Revisions",
          "Money Back Guarantee"
        ],
        recommended: false
      },
      {
        id: 2,
        name: "Standard",
        price: "$0.69",
        unit: "per image",
        description: "Ideal for professional use",
        features: [
          "Background Removal",
          "Clipping Path",
          "12-24h Delivery",
          "3 Free Revisions",
          "Money Back Guarantee"
        ],
        recommended: true
      },
      {
        id: 3,
        name: "Premium",
        price: "$1.29",
        unit: "per image",
        description: "For the best quality",
        features: [
          "Background Removal",
          "Clipping Path",
          "Shadow & Reflection",
          "4-8h Express Delivery",
          "5 Free Revisions",
          "Money Back Guarantee"
        ],
        recommended: false
      }
    ]
  },
  faq: {
    subtitle: "Frequently Asked Questions",
    title: "Common Questions",
    items: [
      {
        id: 1,
        question: "How long does it take to process an order?",
        answer: "Standard delivery time is 24-48 hours, but we also offer express options."
      },
      {
        id: 2,
        question: "What file formats do you accept?",
        answer: "We accept all common image formats including JPG, PNG, PSD, and TIFF."
      },
      {
        id: 3,
        question: "Do you offer revisions?",
        answer: "Yes, we offer free revisions based on your selected plan."
      },
      {
        id: 4,
        question: "How do I place an order?",
        answer: "You can place an order through our website or contact our support team for bulk orders."
      }
    ]
  }
};

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { slug } = query;

  if (!slug) {
    return res.status(400).json({ error: 'Service slug is required' });
  }

  const serviceKey = `service_${slug}`;

  try {
    switch (method) {
      case 'GET':
        // Get service details
        const serviceData = await getData(serviceKey) || { ...defaultServiceDetails };
        return res.status(200).json(serviceData);

      case 'PUT':
      case 'POST':
        // Update service details
        if (!body) {
          return res.status(400).json({ error: 'Request body is required' });
        }
        
        const existingData = await getData(serviceKey) || {};
        const updatedData = { ...existingData, ...body, updatedAt: new Date().toISOString() };
        
        const success = await saveData(serviceKey, updatedData);
        if (!success) {
          throw new Error('Failed to save service details');
        }
        
        return res.status(200).json(updatedData);

      case 'DELETE':
        // Delete service details (optional)
        // Note: Implement actual deletion logic if needed
        return res.status(200).json({ message: 'Service details deleted' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Service details API error:', error);
    return res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
}
