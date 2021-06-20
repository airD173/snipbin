import React from 'react'

import Head from '@components/Head'

import dynamic from 'next/dynamic'
const Editor = dynamic(import('@components/Editor/Editor'), { ssr: false })
import Footer from '@components/Footer'

import Global from '@css/global.style'
import { styled } from '@css/theme.config'

const HomePage: React.FC = () => {
  Global()
  return (
    <>
      <Head title="New" />
      <Editor pageProps={styled} />
      <Footer />
    </>
  )
}

export default HomePage
