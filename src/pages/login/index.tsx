import { ButtonLogin } from '@/src/components/ButtonLogin'
import { Card } from '@/src/components/Card'
import { InputLogin } from '@/src/components/InputLogin'

import {
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button as ChakraButton,
  Center,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Email from '@/src/assets/images/Email-Icon.svg'
import Password from '@/src/assets/images/Password-Icon.svg'
import Logo from '@/src/assets/images/Logo.png'
import Image from 'next/image'
import { EnvelopeSimple } from '@phosphor-icons/react'
import { useAuth } from '@/src/context/authContext'
function Login() {
  const { login } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    login(username, password)
  }

  return (
    <Box flex={1} justifyContent={'center'}>
      <Center mb={4} mt={9}>
        <Image src={Logo} alt="Logo" width={100} />
      </Center>
      <Center>
        <Text
          fontFamily={'Poppins'}
          fontSize={30}
          color="black"
          fontWeight={'bold'}
        >
          Bem-Vindo
        </Text>
      </Center>

      <Center justifyContent={'center'} alignItems={'center'}>
        <Card TitleCard="Insira suas credenciais para prosseguir">
          <InputLogin
            Placeholder="Documento"
            Icon
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputLogin
            Placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <VStack alignItems={'flex-end'} mx={4}>
            <Text
              fontFamily={'Poppins'}
              mb={3}
              mt={1}
              color={'#6D6D6D'}
              fontSize={12}
              onClick={() => router.push('/forgot-password')}
            >
              Esqueci minha senha
            </Text>
          </VStack>

          <VStack>
            <ButtonLogin Title="ENTRAR" bg={'green'} onClick={handleLogin} />
            <Text fontFamily={'Poppins'} color={'#6D6D6D'} fontSize={13}>
              Não possui uma conta?
            </Text>
          </VStack>
        </Card>
      </Center>
    </Box>
  )
}

export default Login
