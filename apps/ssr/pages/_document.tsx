import Document, { Html, Head, Main, NextScript } from 'next/document'
import CommonScript from '../components/CommonScript'
import AppConfig, { Favicon } from '@/config'

const { description } = AppConfig

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" type="image/x-icon" href={Favicon} />
          <meta name="description" content={description} />
          <CommonScript />
        </Head>
        <body className="light dark:bg-night version-2">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
