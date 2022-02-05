import type { AppProps } from 'next/app'

import global from '@css/global.style'
import Header from '@components/Header'

import NextNProgress from 'nextjs-progressbar'
import { SessionProvider } from 'next-auth/react'

const SnipBin = ({ Component, pageProps }: AppProps) => {
  global()

  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress showOnShallow={true} />
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default SnipBin
