import AccountService from '@/src/services/AccountService'
import AdminAffiliateService from '@/src/services/AdminAffiliateService'
import ClientService from '@/src/services/ClientService'
import ConsultService from '@/src/services/ConsultService'
import { TransactionsInformatioResponse } from '@/src/types/Account/Response'
import { IClient } from '@/src/types/Client'
import { CountNewClientsResponse } from '@/src/types/Client/Response'
import { ConsultCountResponse } from '@/src/types/Consult/Response'
import { Box, Center, Stack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function DashBoard() {
  const [totalAccounts, setTotalAccounts] = useState<CountNewClientsResponse>()
  const [totalConsults, setTotalConsults] = useState<ConsultCountResponse>()
  const [transactionInformation, setTransactionInformation] =
    useState<TransactionsInformatioResponse>()

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

  const fetchTransactionsInformation = async () => {
    const userAccount = localStorage.getItem('_u_account')
    const user: IClient = JSON.parse(userAccount!)
    try {
      const response = await AccountService.getTransactionsInformation(
        user.account[0].account,
      )
      setTransactionInformation(response)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  useEffect(() => {
    const loggedId = localStorage.getItem('_uid')
    if (loggedId) {
      fetchTransactionsInformation()
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
                Criadas: {totalAccounts ? totalAccounts?.totalAccounts : 0}
              </Text>
              <Text fontSize={18} mx={4} fontWeight={'bold'} color={'white'}>
                Regulares: {totalAccounts ? totalAccounts?.regularAccounts : 0}
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
                {totalAccounts ? totalAccounts?.lastThirtyDays : 0}
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
                {transactionInformation
                  ? transactionInformation?.cashOut.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 'R$ 0,00'}
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
                {totalConsults ? totalConsults?.total : 0}
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
                {totalConsults ? totalConsults?.news : 0}
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
                {transactionInformation
                  ? transactionInformation?.cashIn.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 'R$ 0,00'}
              </Text>
            </Box>
          </Stack>
        </VStack>
      </Center>
    </Box>
  )
}

export default DashBoard
