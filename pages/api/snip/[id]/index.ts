import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const response = await prisma.snip.findUnique({
    where: {
      slug: id.toString(),
    },
  })

  if (response) return res.status(200).json(response)
  return res.status(404).json({ data: 'Not Found' })
}
