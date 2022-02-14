import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers
  const { content, slug, password, language } = req.body

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
          language: language,
        },
      })

      return res.status(200).json(snip)
    }

    const snip = await prisma.snip.create({
      data: {
        content: content,
        slug: slug,
        password: password,
        language: language,
      },
    })

    return res.status(200).json(snip)
  }

  const snip = await prisma.snip.create({
    data: {
      content: content,
      slug: slug,
      password: password,
      language: language,
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
