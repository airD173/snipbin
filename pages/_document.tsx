import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '@css/theme.config'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preload' href='/iosevka.ttf' as='font' crossOrigin='' />
          <style
            id='stitches'
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
