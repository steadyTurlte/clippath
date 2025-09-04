import { getData, saveData } from '@/utils/dataUtils';

export default async function handler(req, res) {
  // GET request to retrieve all news
  if (req.method === 'GET') {
    try {
      let data = await getData('news');

      // Initialize news data if it doesn't exist
      if (!data) {
        data = {
          news: [],
          categories: [
            { id: 1, name: 'Photo Editing', description: 'Articles about photo editing techniques' },
            { id: 2, name: 'Business', description: 'Business and industry news' },
            { id: 3, name: 'Tips & Tricks', description: 'Helpful tips and tricks' }
          ]
        };

        // Save the initialized data
        await saveData('news', data);
      }

      // Ensure news is an array
      if (!Array.isArray(data.news)) {
        data.news = [];
      }

      // Ensure categories exist
      if (!data.categories) {
        data.categories = [
          { id: 1, name: 'Photo Editing', description: 'Articles about photo editing techniques' },
          { id: 2, name: 'Business', description: 'Business and industry news' },
          { id: 3, name: 'Tips & Tricks', description: 'Helpful tips and tricks' }
        ];
        await saveData('news', data);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching news data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}
