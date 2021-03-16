import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../libs/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const clips = await prisma.clip.findMany();
      res.status(200).json(clips);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else if (req.method === 'POST') {
    res.status(200).json('not yet');
  } else {
    res.status(400).json({ message: 'api not found' });
  }
}

export default handler
