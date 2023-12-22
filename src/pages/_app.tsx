// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider, useAuth } from '../context/authContext'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import NavBar from '../components/NavBar/NavBar'

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
