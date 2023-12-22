import React from 'react'

import { Box, Center, Flex, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ArrowsClockwise, User } from '@phosphor-icons/react'
import { useAuth } from '@/src/context/authContext'

const Header = () => {
  const router = useRouter()
  const { userAuthenticated } = useAuth()
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
                <Text fontSize={14} color={'white'} fontWeight="bold">
                  Administrador@gmail.com
                </Text>
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
