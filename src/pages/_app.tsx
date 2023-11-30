import { ChakraProvider } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar/NavBar'

export default function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
