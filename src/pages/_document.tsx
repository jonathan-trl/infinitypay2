import { Input } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import ReactInputMask from 'react-input-mask'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={'anonymous'}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@500&family=Montserrat:wght@300&family=Noto+Sans+Tangsa&family=Open+Sans:wght@700&family=Poppins:wght@400;700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href="/logo-ico.svg" type="image/svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Input as={ReactInputMask} />

        <div id="little-content"></div>
      </body>
    </Html>
  )
}
