import { useEffect } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Snip as SnipType, User } from '.prisma/client'
import prisma from '@lib/prisma'

import View from '@components/View/View'
import Shortcuts from '@components/Shortcuts'

const Snip: NextPage<{
  snip: SnipType
  slug: string[]
  snips: SnipType[]
  user?: User
  error: Error
  extension: string | undefined
}> = ({ snip, snips, error, user, extension }) => {
  const router = useRouter()

  useEffect(() => {
    error && router.push('/')
  }, [])

  return (
    <>
      {error ? (
        ''
      ) : (
        <View snip={snip} snips={snips} user={user} extension={extension} />
      )}
      <Shortcuts edit={false} />
    </>
  )
}

export default Snip

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const error = new Error('Snip does not exist')

  const slug = context.params?.id?.toString().split('.')
  const extension = slug![1]

  const snip = await prisma.snip.findUnique({
    where: {
      slug: slug![0],
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

    if (snip?.authorId === user?.id)
      return {
        props: {
          snips,
          snip,
          user,
          extension,
        },
      }

    return {
      props: {
        snips,
        snip,
        extension,
      },
    }
  }

  if (snip) {
    return {
      props: {
        snip,
        extension,
      },
    }
  }

  return {
    props: {
      error,
      extension,
    },
  }
}
