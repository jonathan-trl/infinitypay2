// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import NavBar from '../components/NavBar/NavBar'
import { AuthProvider } from '../context/authContext'

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <NavBar />
        <ToastContainer style={{ width: '700px' }} />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
