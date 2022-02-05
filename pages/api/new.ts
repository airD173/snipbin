import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  const { content, slug, id, password } = req.body

  if (session) {
    prisma.snip
      .create({
        data: {
          content: content,
          slug: slug,
          author: { connect: { id: 1 } },
          password: password,
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
    },
  })

  return res.status(200).end()
}
