import { getData, saveData } from "@/utils/dataUtils";

// Default client logos data
const defaultClientLogos = {
  title: "Trusted By Leading Brands",
  subtitle: "Our Clients",
  description: "We've had the privilege of working with amazing companies around the world.",
  items: [
    {
      id: 1,
      name: "Fashion Plus",
      logo: "/images/clients/logo1.png",
      website: "https://example.com",
      order: 1
    },
    {
      id: 2,
      name: "Tech Solutions Inc.",
      logo: "/images/clients/logo2.png",
      website: "https://example.com",
      order: 2
    },
    {
      id: 3,
      name: "Global Retail",
      logo: "/images/clients/logo3.png",
      website: "https://example.com",
      order: 3
    },
    {
      id: 4,
      name: "Luxury Brands",
      logo: "/images/clients/logo4.png",
      website: "https://example.com",
      order: 4
    },
    {
      id: 5,
      name: "Creative Studio",
      logo: "/images/clients/logo5.png",
      website: "https://example.com",
      order: 5
    },
    {
      id: 6,
      name: "Fashion House",
      logo: "/images/clients/logo6.png",
      website: "https://example.com",
      order: 6
    }
  ]
};

export default async function handler(req, res) {
  const { method, body, query } = req;
  const configKey = 'client_logos';
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        // Get all logos or a specific one by ID
        const data = await getData(configKey) || defaultClientLogos;
        
        if (id) {
          const logo = data.items?.find(item => item.id === parseInt(id));
          if (!logo) {
            return res.status(404).json({ error: 'Client logo not found' });
          }
          return res.status(200).json(logo);
        }
        
        // Sort by order if available
        const sortedItems = [...(data.items || [])].sort((a, b) => 
          (a.order || 0) - (b.order || 0)
        );
        
        return res.status(200).json({
          ...data,
          items: sortedItems
        });

      case 'POST':
        // Add a new client logo
        if (!body) {
          return res.status(400).json({ error: 'Request body is required' });
        }
        
        const existingData = await getData(configKey) || { items: [] };
        const newLogo = {
          ...body,
          id: Date.now(), // Simple ID generation
          order: (existingData.items?.length || 0) + 1,
          createdAt: new Date().toISOString()
        };
        
        const updatedLogos = {
          ...defaultClientLogos,
          ...existingData,
          items: [...(existingData.items || []), newLogo],
          updatedAt: new Date().toISOString()
        };
        
        const success = await saveData(configKey, updatedLogos);
        if (!success) {
          throw new Error('Failed to save client logo');
        }
        
        return res.status(201).json(newLogo);

      case 'PUT':
        // Update an existing client logo
        if (!id || !body) {
          return res.status(400).json({ error: 'ID and request body are required' });
        }
        
        const currentData = await getData(configKey) || { items: [] };
        const index = currentData.items?.findIndex(item => item.id === parseInt(id));
        
        if (index === -1 || !currentData.items?.[index]) {
          return res.status(404).json({ error: 'Client logo not found' });
        }
        
        const updatedLogo = {
          ...currentData.items[index],
          ...body,
          updatedAt: new Date().toISOString()
        };
        
        currentData.items[index] = updatedLogo;
        
        const updateSuccess = await saveData(configKey, currentData);
        if (!updateSuccess) {
          throw new Error('Failed to update client logo');
        }
        
        return res.status(200).json(updatedLogo);

      case 'DELETE':
        // Delete a client logo
        if (!id) {
          return res.status(400).json({ error: 'ID is required' });
        }
        
        const currentLogos = await getData(configKey) || { items: [] };
        const filteredLogos = currentLogos.items?.filter(item => item.id !== parseInt(id)) || [];
        
        if (filteredLogos.length === currentLogos.items?.length) {
          return res.status(404).json({ error: 'Client logo not found' });
        }
        
        // Reorder remaining items
        const reorderedLogos = filteredLogos.map((item, idx) => ({
          ...item,
          order: idx + 1
        }));
        
        const deleteSuccess = await saveData(configKey, {
          ...currentLogos,
          items: reorderedLogos,
          updatedAt: new Date().toISOString()
        });
        
        if (!deleteSuccess) {
          throw new Error('Failed to delete client logo');
        }
        
        return res.status(200).json({ message: 'Client logo deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Client Logos API error:', error);
    return res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
}
