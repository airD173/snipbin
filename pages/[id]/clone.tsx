import { useEffect } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Snip as SnipType } from '.prisma/client'
import prisma from '@lib/prisma'

import Editor from '@components/Editor/Editor'
import Shortcuts from '@components/Shortcuts'

const Snip: NextPage<{
  snip: SnipType
  slug: string[]
  snips: SnipType[]
  error: Error
}> = ({ snip, snips, error }) => {
  const router = useRouter()

  useEffect(() => {
    error && router.push('/')
  }, [])

  return (
    <>
      {error ? '' : <Editor snips={snips} text={snip.content} />}
      <Shortcuts edit={true} />
    </>
  )
}

export default Snip

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const error = new Error('Paste does not exist')

  const snip = await prisma.snip.findUnique({
    where: {
      slug: context.params?.id?.toString(),
    },
  })

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    })

    const snips = await prisma.snip.findMany({
      where: {
        author: user,
      },
    })

    if (snip?.authorId === user?.id) {
      return {
        props: {
          snips,
          snip,
          user,
        },
      }
    }

    return {
      props: {
        snips,
        snip,
      },
    }
  }

  if (snip) {
    return {
      props: {
        snip,
      },
    }
  }

  return {
    props: {
      error,
    },
  }
}
