import React, { useState } from 'react'
import {
  Box,
  Center,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ArrowsClockwise, User } from '@phosphor-icons/react'
import { useAuth } from '@/src/context/authContext'

const Header = () => {
  const router = useRouter()
  const { userAuthenticated } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    // Adicione lógica de logout aqui
    // Por exemplo, chame a função de logout do seu contexto de autenticação
  }

  return (
    <>
      {userAuthenticated && (
        <Box bg="black" w="full" h={12} p={4} color="white">
          <HStack justifyContent={'space-between'}>
            <Center ml={64}>
              <HStack mx={8}>
                <Text fontWeight="bold">Saldo R$ 8.503,87</Text>
                <ArrowsClockwise color="white" size={16} />
              </HStack>

              <Text
                color={'white'}
                textDecorationLine={'underline'}
                fontWeight="bold"
                onClick={() => router.push('/motheracount')}
              >
                Acessar Conta Mãe
              </Text>
            </Center>

            <Box>
              <HStack>
                <Menu>
                  <MenuButton>Administrador@gmail.com</MenuButton>
                  <MenuList>
                    <MenuItem
                      color={'black'}
                      onClick={() => console.log('Senha')}
                    >
                      Alterar Senha
                    </MenuItem>
                    <MenuItem
                      color={'black'}
                      onClick={() => console.log('Sair')}
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
                <User color="white" size={16} />
              </HStack>
            </Box>
          </HStack>
        </Box>
      )}
    </>
  )
}

export default Header
