import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { authorization } = req.headers
  const { content, slug, password } = req.body

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
      const updateSnip = await prisma.snip.update({
        where: {
          slug: id.toString(),
        },
        data: {
          content: content,
          slug: slug,
          password: password,
        },
      })

      return res.status(200).json(updateSnip)
    }

    return res.status(403).json({ error: 'Not authenticated!' })
  }

  return res.status(403).end()
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}
