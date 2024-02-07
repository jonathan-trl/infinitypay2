import { ButtonSearch } from '@/src/components/ButtonSearch'
import { ButtonStatus } from '@/src/components/ButtonStatus'
import { Input } from '@/src/components/Input'
import useCustomToast from '@/src/hooks/useCustomToast'
import ExemptionService from '@/src/services/ExemptionService'
import { ExemptionResponse } from '@/src/types/Exception/Response'
import { formatDate } from '@/src/utils/formatDate'
import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function Exemption() {
  const [exemptions, setExemptions] = useState<ExemptionResponse[]>([])
  const { showToast } = useCustomToast()

  const fetchExemptions = async () => {
    try {
      const newExemptions = await ExemptionService.listExemptions()
      setExemptions(newExemptions)
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.error
      ) {
        showToast(error.response.data.error, 'error')
      } else {
        showToast(
          'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
          'error',
        )
      }
    }
  }

  useEffect(() => {
    fetchExemptions()
  }, [])

  return (
    <Box flex={1} p={{ base: 4, md: 8 }}>
      <Text
        fontSize={{ base: 20, md: 30 }}
        fontWeight="bold"
        color="black"
        mx={{ base: 2, md: 52 }}
        mb={12}
        mt={4}
      >
        Todos os Pedidos de Isenção
      </Text>
      <HStack mb={4} ml={52}>
        <Input placeholder="Pesquisar" />
        <ButtonSearch />
      </HStack>

      <TableContainer>
        <Table size={{ base: 'sm', md: 'lg' }}>
          <Thead>
            <Tr>
              <Th>DATA</Th>
              <Th>NOME</Th>
              <Th>LOGIN</Th>
              <Th>DOCUMENTO</Th>
              <Th>SAQUES TOTAIS</Th>
              <Th>STATUS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {exemptions.map((exemption, index) => (
              <Tr key={index}>
                <Td fontWeight="bold">{formatDate(exemption.createdAt)}</Td>
                <Td fontWeight="bold">{exemption.name}</Td>
                <Td fontWeight="bold">{exemption.login}</Td>
                <Td fontWeight="bold">{exemption.documentNumber}</Td>
                <Td fontWeight="bold">{exemption.account}</Td>
                <Td fontWeight="bold">
                  <ButtonStatus
                    waiting={exemption.service === 'waiting'}
                    approved={exemption.service === 'approved'}
                    denied={exemption.service === 'denied'}
                    concluded={exemption.service === 'concluded'}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {exemptions.length === 0 && <Text>Nenhum item encontrado!</Text>}
      </TableContainer>
    </Box>
  )
}

export default Exemption
