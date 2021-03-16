import { NextApiRequest, NextApiResponse } from 'next';
import { clipInputSchema } from '../../interfaces';
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
    try {
      const clip = await clipInputSchema.validate(req.body);
      const item = await prisma.clip.create({
        data: {
          content: clip.content,
        },
      });
      res.status(200).json({ item });
    } catch (err) {
      res.status(400).json({ statusCode: 400, message: err.message })
    }
  } else {
    res.status(400).json({ message: 'api not found' });
  }
}

export default handler
