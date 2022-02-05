import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  const { content, slug, password } = req.body

  if (session) {
    await prisma.snip.update({
      where: {
        slug: slug,
      },
      data: {
        content: content,
        slug: slug,
        password: password,
      },
    })

    return res.status(200).end()
  }

  return res.status(403).end()
}
