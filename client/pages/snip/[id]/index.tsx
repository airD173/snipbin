import React from 'react'

import dynamic from 'next/dynamic'
const View = dynamic(import('@components/View/View'), { ssr: false })
import Footer from '@components/Footer'

import global from '@css/global.style'
import { styled } from '@css/theme.config'

const Snip: React.FC = () => {
  global()

  return (
    <>
      <View pageProps={styled} />
      <Footer />
    </>
  )
}

export default Snip
