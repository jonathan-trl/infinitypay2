import { ButtonLogin } from '@/src/components/ButtonLogin'
import { Card } from '@/src/components/Card'
import { InputLogin } from '@/src/components/InputLogin'

import Logo from '@/src/assets/images/Logo.png'
import useCustomToast from '@/src/hooks/useCustomToast'
import AuthService from '@/src/services/AuthService'
import { ForgotPasswordRequest } from '@/src/types/Auth/Request'
import { Box, Center, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'

function ForgotPassword() {
  const [username, setUsername] = useState('')
  const { showToast } = useCustomToast()

  const handleForgotPassword = async () => {
    try {
      const data: ForgotPasswordRequest = {
        username,
      }

      const response = await AuthService.forgotPassword(data)

      console.log(response)
    } catch (error: any) {
      if (error.response.status === 400 && error.response.data?.error) {
        showToast(error.response.data.error, 'error')
      } else {
        showToast(
          'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
          'error',
        )
      }
    }
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
          Esqueci minha senha
        </Text>
      </Center>

      <Center justifyContent={'center'} alignItems={'center'}>
        <Card TitleCard="Insira suas credenciais para prosseguir" h={'auto'}>
          <InputLogin
            Placeholder="Nome de usuário"
            Icon
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <VStack mt={3}>
            <ButtonLogin
              Title="Confirmar"
              bg={'green'}
              onClick={handleForgotPassword}
            />
          </VStack>
        </Card>
      </Center>
    </Box>
  )
}

export default ForgotPassword
