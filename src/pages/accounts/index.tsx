import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import TableBodyClients from '@/src/components/Pages/Accounts/TableBodyClients'
import useCustomToast from '@/src/hooks/useCustomToast'
import ClientService from '@/src/services/ClientService'
import { ListAllClientsParamsRequest } from '@/src/types/Client/Request'
import { ClientResponse } from '@/src/types/Client/Response'
import {
  Box,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Acounts() {
  const router = useRouter()
  const [clients, setClients] = useState<ClientResponse[]>([])
  const [inputDocumentNumber, setInputDocumentNumber] = useState('')
  const [inputName, setInputName] = useState('')
  const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
  const { showToast } = useCustomToast()

  const fetchClients = async () => {
    setShowSpinnerLoading(true)
    try {
      let params: ListAllClientsParamsRequest = {}
      if (inputDocumentNumber.length > 0 || inputName.length > 0) {
        params = {
          name: inputName.trim(),
          documentNumber: inputDocumentNumber.trim().replace(/\D/g, ''),
        }
      }
      const newClients = await ClientService.listAll(params)
      setClients(newClients)
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
    setShowSpinnerLoading(false)
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <Box flex={1}>
      <Text
        fontSize={{ base: 20, md: 30 }}
        fontWeight="bold"
        color="black"
        mx={{ base: 2, md: 52 }}
        mb={12}
        mt={4}
      >
        Todas as Contas
      </Text>

      <Box flexDir={'column'} ml={{ base: 2, md: 52 }}>
        <Flex gap={3}>
          <Box>
            <Input
              placeholder="Pesquisar Nome"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </Box>

          <Box>
            <Input
              placeholder="Pesquisar CPF"
              value={inputDocumentNumber}
              type="number"
              onChange={(e) => setInputDocumentNumber(e.target.value)}
            />
          </Box>

          <Button title="Limpar" onClick={fetchClients} />
        </Flex>

        <Button
          title="Nova Conta"
          onClick={() => router.push('/accounts/create')}
        />
      </Box>

      <TableContainer ml={{ base: 2, md: 52 }}>
        <Table size={{ base: 'sm', md: 'lg' }}>
          <Thead>
            <Tr>
              <Th>DATA</Th>
              <Th>NOME</Th>
              <Th>CONTA</Th>
              <Th>DOCUMENTO</Th>
              <Th>STATUS</Th>
              {/* <Th>CONTA</Th> */}
              <Th>SALDO</Th>
              <Th>AÇÕES</Th>
            </Tr>
          </Thead>
          {showSpinnerLoading && <Spinner />}
          <TableBodyClients clients={clients} />
        </Table>
        {!showSpinnerLoading && clients.length === 0 && (
          <Text>Nenhum item encontrado!</Text>
        )}
      </TableContainer>
    </Box>
  )
}

export default Acounts
