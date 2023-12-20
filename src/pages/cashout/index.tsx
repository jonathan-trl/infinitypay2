import React from 'react'
import { Input } from '@/src/components/Input'
import { CashOutData } from '../../data/CashOutData'
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
import { Info } from '@phosphor-icons/react'
import { ButtonSearch } from '@/src/components/ButtonSearch'

function CashOut() {
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
        Cash Out
      </Text>
      <HStack mb={4} ml={52}>
        <Input placeholder="Pesquisar" />
        <ButtonSearch />
      </HStack>

      <TableContainer mx={{ base: 2, md: 52 }}>
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
            {CashOutData.map((info, index) => (
              <Tr key={index}>
                <Td fontWeight="bold">{info.user}</Td>
                <Td fontWeight="bold">{info.date}</Td>
                <Td fontWeight="bold">{info.type}</Td>
                <Td fontWeight="bold">{info.status}</Td>
                <Td fontWeight="bold">{info.total}</Td>
                <Td fontWeight="bold">{info.liquid}</Td>
                <Td fontWeight="bold">
                  <Info color="black" size={20} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CashOut
