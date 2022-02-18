import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  const { content, slug, password, language } = req.body

  if (session) {
    return prisma.snip
      .create({
        data: {
          content: content,
          slug: slug,
          author: { connect: { id: parseInt(session.user?.name!) } },
          password: password,
          language: language,
        },
      })
      .then(() => res.status(200).end())
      .catch((err) => res.status(409).end())
  }

  await prisma.snip.create({
    data: {
      content: content,
      slug: slug,
      password: password,
      language: language,
    },
  })

  return res.status(200).end()
}
