import { Html, Head, Main, NextScript } from 'next/document'

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

        <link
          href="https://fonts.googleapis.com/css2?family=Gabarito:wght@700&family=Roboto:wght@400;700&family=Rubik:wght@700&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href="/logo-ico.svg" type="image/svg" />
      </Head>
      <body>
        <Main />
        <NextScript />

        <div id="little-content"></div>
      </body>
    </Html>
  )
}
