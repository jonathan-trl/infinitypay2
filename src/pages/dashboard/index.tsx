import AdminAffiliateService from '@/src/services/AdminAffiliateService'
import ClientService from '@/src/services/ClientService'
import ConsultService from '@/src/services/ConsultService'
import { CountNewClientsResponse } from '@/src/types/Client/Response'
import { ConsultCountResponse } from '@/src/types/Consult/Response'
import { Box, Center, Stack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function DashBoard() {
  const [totalAccounts, setTotalAccounts] = useState<CountNewClientsResponse>()
  const [totalConsults, setTotalConsults] = useState<ConsultCountResponse>()

  const fetchTotalAccounts = async () => {
    try {
      const response = await ClientService.countNewClients()
      setTotalAccounts(response)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  const fetchTotalConsults = async () => {
    try {
      const response = await ConsultService.consultCount()
      setTotalConsults(response)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  const fetchUser = async () => {
    const loggedId = localStorage.getItem('_uid')
    try {
      const user = await AdminAffiliateService.getAdminAffiliateDetails(
        loggedId!,
      )
      localStorage.setItem('_u_account', JSON.stringify(user))
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  useEffect(() => {
    const loggedId = localStorage.getItem('_uid')
    console.log('loggedid: ', loggedId)
    if (loggedId) {
      fetchUser()
    }
  }, [])

  useEffect(() => {
    fetchTotalAccounts()
    fetchTotalConsults()
  }, [])

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
      <Center>
        <VStack spacing={4} align="stretch">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            align="stretch"
          >
            <Box bg={'black'} h={52} mx={2} my={2} w={{ base: '96', md: 64 }}>
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
                Criadas: {totalAccounts?.totalAccounts}
              </Text>
              <Text fontSize={18} mx={4} fontWeight={'bold'} color={'white'}>
                Regulares: {totalAccounts?.regularAccounts}
              </Text>
            </Box>

            <Box bg={'black'} h={52} mx={2} my={2} w={{ base: '96', md: 64 }}>
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
                {totalAccounts?.lastThirtyDays}
              </Text>
            </Box>

            <Box bg={'black'} h={52} mx={2} my={2} w={{ base: '96', md: 64 }}>
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
            <Box bg={'black'} h={52} mx={2} my={2} w={{ base: '96', md: 64 }}>
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
                {totalConsults?.total}
              </Text>
            </Box>

            <Box bg={'black'} h={52} mx={2} my={2} w={{ base: '96', md: 64 }}>
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
                {totalConsults?.news}
              </Text>
            </Box>

            <Box bg={'black'} h={52} mx={2} my={2} w={{ base: '96', md: 64 }}>
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
      </Center>
    </Box>
  )
}

export default DashBoard
