import React from 'react'
import { ButtonSearch } from '@/src/components/ButtonSearch'
import { ButtonStatus } from '@/src/components/ButtonStatus'
import { Input } from '@/src/components/Input'
import { ExemptionData } from '@/src/data/ExemptionData'
import {
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

function Exemption() {
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
            {ExemptionData.map((info, index) => (
              <Tr key={index}>
                <Td fontWeight="bold">{info.date}</Td>
                <Td fontWeight="bold">{info.name}</Td>
                <Td fontWeight="bold">{info.login}</Td>
                <Td fontWeight="bold">{info.document}</Td>
                <Td fontWeight="bold">{info.totalWithdraw}</Td>
                <Td fontWeight="bold">
                  <ButtonStatus
                    waiting={info.status === 'waiting'}
                    approved={info.status === 'approved'}
                    denied={info.status === 'denied'}
                    concluded={info.status === 'concluded'}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Exemption
