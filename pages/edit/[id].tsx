import { useEffect } from 'react'

import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import prisma from '@lib/prisma'
import { Snip as SnipType } from '.prisma/client'

import Edit from '@components/Edit/Edit'
import Shortcuts from '@components/Shortcuts'

const Snip: NextPage<{ snip: SnipType; snips: SnipType[]; error: Error }> = ({
  snip,
  snips,
  error,
}) => {
  const router = useRouter()

  useEffect(() => {
    error && router.push('/')
  }, [])

  return (
    <>
      {error ? '' : <Edit snip={snip} snips={snips} />}
      <Shortcuts edit={true} />
    </>
  )
}

export default Snip

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const error = new Error('Snip does not exist')

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

    const snip = await prisma.snip.findUnique({
      where: {
        slug: context.params?.id?.toString(),
      },
    })

    if (snip?.authorId === user?.id) {
      return {
        props: {
          snip,
          snips,
        },
      }
    }

    return {
      props: {
        error,
      },
    }
  }

  return {
    props: {
      error,
    },
  }
}
