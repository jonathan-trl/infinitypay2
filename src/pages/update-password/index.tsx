import { ButtonLogin } from '@/src/components/ButtonLogin'
import { Card } from '@/src/components/Card'
import { InputLogin } from '@/src/components/InputLogin'

import Logo from '@/src/assets/images/Logo.png'
import AuthService from '@/src/services/AuthService'
import { UpdatePasswordRequest } from '@/src/types/Auth/Request'
import { Box, Center, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
function UpdatePassword() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdatePassword = async () => {
    try {
      const id = localStorage.getItem('_uid')
      const data: UpdatePasswordRequest = {
        username,
        password,
        confirmPassword,
      }

      const response = await AuthService.updatePassword(id!, data)

      console.log(response)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
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
          Alterar senha
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

          <InputLogin
            Placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputLogin
            Placeholder="Confirmar Senha"
            value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <VStack mt={3}>
            <ButtonLogin
              Title="Confirmar"
              bg={'green'}
              onClick={handleUpdatePassword}
            />
          </VStack>
        </Card>
      </Center>
    </Box>
  )
}

export default UpdatePassword
