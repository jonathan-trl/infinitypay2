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
        <Box
          bg="black"
          w="full"
          h={{ base: 'auto', md: 12 }}
          p={4}
          color="white"
        >
          <HStack
            justifyContent={{ base: 'space-around', md: 'space-between' }}
          >
            <Center>
              <HStack>
                <Text
                  fontWeight="bold"
                  textAlign={{ base: 'center', md: 'left' }}
                  fontSize={{ base: 'sm', md: 'lg' }}
                >
                  Saldo R$ 8.503,87
                </Text>
                <ArrowsClockwise color="white" />
              </HStack>
            </Center>

            <Center>
              <Text
                color={'white'}
                textDecorationLine={'underline'}
                fontWeight="bold"
                fontSize={{ base: 'sm', md: 'lg' }}
                onClick={() => router.push('/motheracount')}
              >
                Acessar Conta Mãe
              </Text>
            </Center>

            <Center>
              <HStack>
                <Menu>
                  <MenuButton fontSize={{ base: 'sm', md: 'md' }}>
                    Administrador@gmail.com
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      color={'black'}
                      fontSize={{ base: 'sm', md: 'md' }}
                      onClick={() => console.log('Senha')}
                    >
                      Alterar Senha
                    </MenuItem>
                    <MenuItem
                      color={'black'}
                      fontSize={{ base: 'sm', md: 'md' }}
                      onClick={() => console.log('Sair')}
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
                <User color="white" />
              </HStack>
            </Center>
          </HStack>
        </Box>
      )}
    </>
  )
}

export default Header
