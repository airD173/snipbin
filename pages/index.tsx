import type { GetServerSideProps, NextPage } from 'next'

import prisma from '@lib/prisma'
import Editor from '@components/Editor/Editor'

import { Snip as SnipType } from '.prisma/client'

import { getSession } from 'next-auth/react'

const Home: NextPage<{ userPastes: SnipType[] | undefined }> = ({
  userPastes,
}) => {
  return (
    <>
      <Editor snips={userPastes} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    })

    const userPastes = await prisma.snip.findMany({
      where: {
        author: user,
      },
    })

    return {
      props: {
        userPastes,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default Home
