import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { authorization } = req.headers

  const user = await prisma.user.findUnique({
    where: {
      api: authorization?.toString(),
    },
  })

  if (user) {
    const snip = await prisma.snip.findUnique({
      where: {
        slug: id.toString(),
      },
    })

    if (snip?.authorId === user.id) {
      const deletedSnip = await prisma.snip.delete({
        where: {
          slug: id.toString(),
        },
      })

      return res.status(200).json(deletedSnip)
    }

    return res.status(403).json({ error: 'Invalid user' })
  }

  return res.status(403).json({ error: 'No authorization' })
}
