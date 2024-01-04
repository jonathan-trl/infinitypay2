import React from 'react'
import { Box, Text, VStack, Stack } from '@chakra-ui/react'
import {
  ArrowsClockwise,
  Plus,
  Info,
  Check,
  CheckCircle,
} from '@phosphor-icons/react'

function DashBoard() {
  return (
    <Box>
      <Text
        fontSize={{ base: 20, md: 30 }}
        fontWeight="bold"
        color="black"
        mx={{ base: 2, md: 52 }}
        mb={4}
        mt={4}
      >
        Dashboard
      </Text>
      <VStack spacing={4} align="stretch">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align="stretch"
        >
          <Box bg={'black'} h={52} mx={2} my={2} flex={1}>
            <Text
              fontSize={22}
              my={5}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              Total de Contas
            </Text>
            <Text
              fontSize={18}
              mt={16}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              Criadas: 2821
            </Text>
            <Text fontSize={18} mx={4} fontWeight={'bold'} color={'white'}>
              Regulares: 2039
            </Text>
          </Box>

          <Box bg={'black'} h={52} mx={2} my={2} flex={1}>
            <Text
              fontSize={22}
              mt={5}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              Novas Contas
            </Text>
            <Text fontSize={18} mx={4} fontWeight={'bold'} color={'white'}>
              (últimos 30 dias)
            </Text>
            <Text
              mt={12}
              fontSize={20}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              2039
            </Text>
          </Box>

          <Box bg={'black'} h={52} mx={2} my={2} flex={1}>
            <Text
              fontSize={22}
              mt={5}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              Cash-out
            </Text>

            <Text
              mt={12}
              fontSize={20}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              R$ 3.723.746,73
            </Text>
          </Box>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align="stretch"
        >
          <Box bg={'black'} h={52} mx={2} my={2} flex={1}>
            <Text
              fontSize={22}
              mt={5}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              Consultas CPF
            </Text>
            <Text fontSize={18} mx={4} fontWeight={'bold'} color={'white'}>
              Total
            </Text>
            <Text
              mt={12}
              fontSize={20}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              2039
            </Text>
          </Box>

          <Box bg={'black'} h={52} mx={2} my={2} flex={1}>
            <Text
              fontSize={22}
              mt={5}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              Consultas CPF
            </Text>
            <Text fontSize={18} mx={4} fontWeight={'bold'} color={'white'}>
              (últimos 30 dias)
            </Text>
            <Text
              mt={12}
              fontSize={20}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              1039
            </Text>
          </Box>

          <Box bg={'black'} h={52} mx={2} my={2} flex={1}>
            <Text
              fontSize={22}
              mt={5}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              Cash-in
            </Text>

            <Text
              mt={12}
              fontSize={20}
              mx={4}
              fontWeight={'bold'}
              color={'white'}
            >
              R$ 3.323.446,98
            </Text>
          </Box>
        </Stack>
      </VStack>
    </Box>
  )
}

export default DashBoard
