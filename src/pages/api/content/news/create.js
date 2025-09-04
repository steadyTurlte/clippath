import { getData, saveData } from '@/utils/dataUtils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const newsData = req.body;

    // Validate required fields
    if (!newsData.title || !newsData.slug || !newsData.content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get existing news data
    let data = await getData('news');

    // Initialize data if it doesn't exist
    if (!data) {
      data = {
        news: [],
        categories: [
          { id: 1, name: 'Photo Editing', description: 'Articles about photo editing techniques' },
          { id: 2, name: 'Business', description: 'Business and industry news' },
          { id: 3, name: 'Tips & Tricks', description: 'Helpful tips and tricks' }
        ]
      };
    } else if (!Array.isArray(data.news)) {
      // Ensure news is an array - this handles the case where data.news might be a single object
      data.news = [];
    }

    // Ensure categories exist
    if (!data.categories) {
      data.categories = [
        { id: 1, name: 'Photo Editing', description: 'Articles about photo editing techniques' },
        { id: 2, name: 'Business', description: 'Business and industry news' },
        { id: 3, name: 'Tips & Tricks', description: 'Helpful tips and tricks' }
      ];
    }

    // Guard against duplicate slug
    const slugExists = data.news.some((n) => n.slug === newsData.slug);
    if (slugExists) {
      return res.status(409).json({ message: 'A post with this slug already exists' });
    }

    // Add ID if not provided
    if (!newsData.id) {
      newsData.id = Date.now();
    }

    // Add created/updated timestamp
    newsData.updatedAt = new Date().toISOString();
    if (!newsData.createdAt) {
      newsData.createdAt = newsData.updatedAt;
    }

    // Add the new news article
    data.news.unshift(newsData);

    // Save the updated data
    const success = await saveData('news', data);

    if (!success) {
      return res.status(500).json({ message: 'Failed to save news data' });
    }

    return res.status(201).json({ message: 'News created successfully', news: newsData });
  } catch (error) {
    console.error('Error creating news:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
