import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers
  const { content, slug, password } = req.body

  if (authorization) {
    const user = await prisma.user.findUnique({
      where: {
        api: authorization.toString(),
      },
    })

    if (user) {
      const snip = await prisma.snip.create({
        data: {
          content: content,
          slug: slug,
          author: { connect: { id: user?.id } },
          password: password,
        },
      })

      return res.status(200).json(snip)
    }

    const snip = await prisma.snip.create({
      data: {
        content: content,
        slug: slug,
        password: password,
      },
    })

    return res.status(200).json(snip)
  }

  const snip = await prisma.snip.create({
    data: {
      content: content,
      slug: slug,
      password: password,
    },
  })

  return res.status(200).json(snip)
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}
