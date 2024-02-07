import { ButtonSearch } from '@/src/components/ButtonSearch'
import { Input } from '@/src/components/Input'
import useCustomToast from '@/src/hooks/useCustomToast'
import AccountService from '@/src/services/AccountService'
import { GetAccountExtractRequestParams } from '@/src/types/Account/Request'
import { AccountExtractMovements } from '@/src/types/Account/Response'
import { IClient } from '@/src/types/Client'
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
import { Info } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

function CashIn() {
  const [cashInMovements, setCashInMovements] = useState<
    AccountExtractMovements[]
  >([])
  const { showToast } = useCustomToast()

  const fetchExtract = async () => {
    const userAccount = localStorage.getItem('_u_account')
    const user: IClient = JSON.parse(userAccount!)
    try {
      if (user) {
        const params: GetAccountExtractRequestParams = {
          account: user.account[0].account,
          documentNumber: user.documentNumber,
        }

        const extracts = await AccountService.getAccountExtract(params)

        if (extracts && extracts.body) {
          const { movements } = extracts.body

          const filteredCashInMovements = movements.filter(
            (movement) => movement.balanceType === 'CREDIT',
          )

          // Atualizar o estado com os movimentos filtrados
          setCashInMovements(filteredCashInMovements)
        }
      }
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
    const userAccount = localStorage.getItem('_u_account')
    if (userAccount) {
      fetchExtract()
    }
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
        Cash In
      </Text>

      <HStack spacing={4} ml={52}>
        <Input placeholder="Pesquisar" />
        <ButtonSearch />
      </HStack>

      <TableContainer ml={{ base: 2, md: 52 }}>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>USUÁRIO</Th>
              <Th>DATA</Th>
              <Th>TIPO</Th>
              <Th>STATUS</Th>
              <Th>TOTAL</Th>
              <Th>LÍQUIDO</Th>
              <Th>AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cashInMovements.map((info, index) => (
              <Tr key={index}>
                <Td fontWeight="bold">{info.name}</Td>
                <Td fontWeight="bold">{formatDate(info.createDate)}</Td>
                <Td fontWeight="bold">{info.balanceType}</Td>
                <Td fontWeight="bold">{info.status}</Td>
                <Td fontWeight="bold">
                  {info.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Td>
                <Td fontWeight="bold">
                  {info.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Td>
                <Td fontWeight="bold">
                  <Info color="black" size={20} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {cashInMovements.length === 0 && <Text>Nenhum item encontrado!</Text>}
      </TableContainer>
    </Box>
  )
}

export default CashIn
