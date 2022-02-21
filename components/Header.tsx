import React from 'react'

import Head from 'next/head'

const Header: React.FC = () => {
  return (
    <Head>
      <title>SnipBin</title>
      <meta property='og:title' content='SnipBin' />
      <meta property='twitter:title' content='SnipBin' />
      <meta
        name='description'
        content='Lightweight, beautiful, feature-rich and accessible pastebin aimed at fixing the shortcomings of other PasteBins.'
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://snip.hxrsh.in' />
      <meta
        property='og:description'
        content='Lightweight, beautiful, feature-rich and accessible pastebin aimed at fixing the shortcomings of other PasteBins.'
      />
      <meta property='twitter:url' content='https://snip.hxrsh.in' />
      <meta
        property='twitter:description'
        content='Lightweight, beautiful, feature-rich and accessible pastebin aimed at fixing the shortcomings of other PasteBins.'
      />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      <meta name='theme-color' content='#ffffff' />
      <link
        rel='icon'
        href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✂</text></svg>'
      />
    </Head>
  )
}

export default Header
