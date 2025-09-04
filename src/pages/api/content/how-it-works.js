import { getData, saveData } from '@/utils/dataUtils';

const HOW_IT_WORKS_KEY = 'how_it_works';

const defaultData = {
  subtitle: 'HOW WE WORKS',
  title: 'How It Works',
  image: { url: '', publicId: '' },
  steps: [
    'Request a quote for the images you need edited — we’ll get back to you within 45 minutes',
    'Request a quote for the images you need edited — we’ll get back to you within 45 minutes',
    'Request a quote for the images you need edited — we’ll get back to you within 45 minutes',
  ],
};

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await getData(HOW_IT_WORKS_KEY);
        if (!data) {
          await saveData(HOW_IT_WORKS_KEY, defaultData);
          return res.status(200).json(defaultData);
        }
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
      }
      break;
    case 'PUT':
      try {
        await saveData(HOW_IT_WORKS_KEY, body);
        res.status(200).json({ message: 'Data saved successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
