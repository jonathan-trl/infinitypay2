import { useAuth } from '@/src/context/authContext'
import useBalance from '@/src/hooks/useBalance'
import { ClientResponse } from '@/src/types/Client/Response'
import {
  Box,
  Button,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { ArrowsClockwise, User } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Header = () => {
  const router = useRouter()
  const { userAuthenticated, logout } = useAuth()
  const { balance, updateBalance } = useBalance()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const userAccount = localStorage.getItem('_u_account')
    if (userAccount) {
      const user: ClientResponse = JSON.parse(userAccount)
      setUserName(user.name)
    }
    updateBalance()
  }, [])

  return (
    <>
      {userAuthenticated && (
        <Box bg="black" w="full" p={4} color="white">
          <HStack
            justifyContent={{ base: 'space-around', md: 'space-between' }}
            mx={{ base: 0, md: 52 }}
          >
            <Center>
              <HStack>
                <Text
                  fontWeight="bold"
                  textAlign={{ base: 'center', md: 'left' }}
                  fontSize={{ base: 'sm', md: 'lg' }}
                >
                  Saldo{' '}
                  {balance?.balance.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }) ?? ''}
                </Text>
                <ArrowsClockwise
                  color="white"
                  cursor={'pointer'}
                  onClick={() => updateBalance('')}
                />
              </HStack>
            </Center>

            <Center>
              <Text
                color={'white'}
                textDecorationLine={'underline'}
                fontWeight="bold"
                fontSize={{ base: 'sm', md: 'lg' }}
                onClick={() => router.push('/settings/my-account')}
                cursor={'pointer'}
              >
                Acessar Conta Mãe
              </Text>
            </Center>

            <Center>
              <HStack>
                <Menu>
                  <MenuButton
                    fontSize={{ base: 'sm', md: 'md' }}
                    as={Button}
                    bg={'transparent'}
                    _hover={{ bg: 'transparent' }}
                    rightIcon={<User />}
                    color={'white'}
                  >
                    {userName ?? 'Administrador@gmail.com'}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      color={'black'}
                      fontSize={{ base: 'sm', md: 'md' }}
                      onClick={() => router.push('/update-password')}
                    >
                      Alterar Senha
                    </MenuItem>
                    <MenuItem
                      color={'black'}
                      fontSize={{ base: 'sm', md: 'md' }}
                      onClick={logout}
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Center>
          </HStack>
        </Box>
      )}
    </>
  )
}

export default Header
