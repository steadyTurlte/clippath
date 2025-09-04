import { getData, saveData } from "@/utils/dataUtils";

// Default testimonials data
const defaultTestimonials = {
  title: "What Our Clients Say",
  subtitle: "Testimonials",
  description: "Hear from our satisfied clients about their experience with our services.",
  items: [
    {
      id: 1,
      name: "John Smith",
      role: "E-commerce Manager",
      company: "Fashion Plus",
      avatar: "/images/testimonials/avatar-1.jpg",
      content: "The quality of work is exceptional. They delivered exactly what we needed for our product catalog.",
      rating: 5,
      date: "2023-10-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Photographer",
      company: "Capture Moments",
      avatar: "/images/testimonials/avatar-2.jpg",
      content: "Fast turnaround time and excellent communication. Will definitely use their services again.",
      rating: 5,
      date: "2023-11-02"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Global Brands Inc.",
      avatar: "/images/testimonials/avatar-3.jpg",
      content: "Professional service with attention to detail. Our products look amazing after their editing.",
      rating: 4,
      date: "2023-09-20"
    }
  ]
};

export default async function handler(req, res) {
  const { method, body, query } = req;
  const configKey = 'testimonials';
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        // Get all testimonials or a specific one by ID
        const data = await getData(configKey) || defaultTestimonials;
        
        if (id) {
          const testimonial = data.items?.find(item => item.id === parseInt(id));
          if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
          }
          return res.status(200).json(testimonial);
        }
        
        return res.status(200).json(data.items || data);

      case 'POST':
        // Add a new testimonial
        if (!body) {
          return res.status(400).json({ error: 'Request body is required' });
        }
        
        const existingData = await getData(configKey) || { items: [] };
        const newTestimonial = {
          ...body,
          id: Date.now(), // Simple ID generation
          date: new Date().toISOString().split('T')[0]
        };
        
        const updatedTestimonials = {
          ...defaultTestimonials,
          ...existingData,
          items: [...(existingData.items || []), newTestimonial],
          updatedAt: new Date().toISOString()
        };
        
        const success = await saveData(configKey, updatedTestimonials);
        if (!success) {
          throw new Error('Failed to save testimonial');
        }
        
        return res.status(201).json(newTestimonial);

      case 'PUT':
        // Update an existing testimonial
        if (!id || !body) {
          return res.status(400).json({ error: 'ID and request body are required' });
        }
        
        const currentData = await getData(configKey) || { items: [] };
        const index = currentData.items?.findIndex(item => item.id === parseInt(id));
        
        if (index === -1) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }
        
        const updatedTestimonial = {
          ...currentData.items[index],
          ...body,
          updatedAt: new Date().toISOString()
        };
        
        currentData.items[index] = updatedTestimonial;
        
        const updateSuccess = await saveData(configKey, currentData);
        if (!updateSuccess) {
          throw new Error('Failed to update testimonial');
        }
        
        return res.status(200).json(updatedTestimonial);

      case 'DELETE':
        // Delete a testimonial
        if (!id) {
          return res.status(400).json({ error: 'ID is required' });
        }
        
        const currentTestimonials = await getData(configKey) || { items: [] };
        const filteredItems = currentTestimonials.items?.filter(item => item.id !== parseInt(id)) || [];
        
        if (filteredItems.length === currentTestimonials.items?.length) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }
        
        const deleteSuccess = await saveData(configKey, {
          ...currentTestimonials,
          items: filteredItems,
          updatedAt: new Date().toISOString()
        });
        
        if (!deleteSuccess) {
          throw new Error('Failed to delete testimonial');
        }
        
        return res.status(200).json({ message: 'Testimonial deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Testimonials API error:', error);
    return res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
}
