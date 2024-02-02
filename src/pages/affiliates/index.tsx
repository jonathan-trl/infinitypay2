import { ButtonSearch } from '@/src/components/ButtonSearch'
import { Input } from '@/src/components/Input'
import useCustomToast from '@/src/hooks/useCustomToast'

import AdminAffiliateService from '@/src/services/AdminAffiliateService'
import { GetAffiliatesListResponse } from '@/src/types/AdminAffiliate/Response'
import {
  Box,
  HStack,
  Button as NativeButton,
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

function Affiliates() {
  const [affiliates, setAffiliates] = useState<GetAffiliatesListResponse[]>([])
  const { showToast } = useCustomToast()

  const fetchAffiliates = async () => {
    try {
      const newAffiliates = await AdminAffiliateService.getAffiliatesList()
      setAffiliates(newAffiliates)
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
  }

  useEffect(() => {
    fetchAffiliates()
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
        Afiliados
      </Text>
      <HStack mb={4} ml={52} alignItems={'center'}>
        <Input placeholder="Pesquisar Email" />
        <ButtonSearch />
      </HStack>

      <TableContainer ml={{ base: 2, md: 52 }}>
        <Table size={{ base: 'sm', md: 'lg' }}>
          <Thead>
            <Tr>
              <Th>EMAIL</Th>
              <Th>TOTAL MOVIMENTADO</Th>
              <Th>CASH-IN</Th>
              <Th>CASH-OUT</Th>
              <Th>TOTAL EM TAXAS</Th>
              <Th>%</Th>
              <Th>AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {affiliates.map((affiliate, index) => (
              <Tr key={index}>
                <Td fontWeight="bold">{affiliate.email}</Td>
                <Td fontWeight="bold">{affiliate.totalMovement}</Td>
                <Td fontWeight="bold">{affiliate.cashIn}</Td>
                <Td fontWeight="bold">{affiliate.cashOut}</Td>
                <Td fontWeight="bold">{affiliate.totalInFees}</Td>
                <Td fontWeight="bold">{affiliate.rate}</Td>
                <Td>
                  <NativeButton
                    bg="black"
                    w={{ base: '28', md: '40' }}
                    h="8"
                    rounded={0}
                  >
                    <Text color="white">Ver Extrato</Text>
                  </NativeButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {affiliates.length === 0 && <Text>Nenhum item encontrado!</Text>}
      </TableContainer>
    </Box>
  )
}

export default Affiliates
