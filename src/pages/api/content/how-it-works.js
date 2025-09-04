import { getData, saveData } from "@/utils/dataUtils";

// Default how it works data
const defaultHowItWorks = {
  title: "How It Works",
  subtitle: "Our Simple Process",
  description: "Follow these easy steps to get your images edited by our professional team.",
  steps: [
    {
      id: 1,
      title: "Upload Your Images",
      description: "Upload your images through our secure platform or send them via email.",
      icon: "bi-upload"
    },
    {
      id: 2,
      title: "Select Service & Options",
      description: "Choose the editing services you need and specify your requirements.",
      icon: "bi-list-check"
    },
    {
      id: 3,
      title: "We Process Your Order",
      description: "Our expert editors will process your images with the highest quality standards.",
      icon: "bi-gear"
    },
    {
      id: 4,
      title: "Review & Download",
      description: "Preview the results and download your edited images once approved.",
      icon: "bi-download"
    }
  ]
};

export default async function handler(req, res) {
  const { method, body } = req;
  const configKey = 'how_it_works';

  try {
    switch (method) {
      case 'GET':
        // Get how it works data
        const data = await getData(configKey) || defaultHowItWorks;
        return res.status(200).json(data.steps || data);

      case 'POST':
      case 'PUT':
        // Update how it works data
        if (!body) {
          return res.status(400).json({ error: 'Request body is required' });
        }
        
        const updatedData = {
          ...defaultHowItWorks,
          ...body,
          updatedAt: new Date().toISOString()
        };
        
        const success = await saveData(configKey, updatedData);
        if (!success) {
          throw new Error('Failed to save how it works data');
        }
        
        return res.status(200).json(updatedData);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('How It Works API error:', error);
    return res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
}
