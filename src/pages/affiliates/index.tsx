import React from 'react'
import { ButtonSearch } from '@/src/components/ButtonSearch'
import { Input } from '@/src/components/Input'
import { AffiliatesData } from '@/src/data/AffiliatesData'

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
  Button as NativeButton,
} from '@chakra-ui/react'

function Affiliates() {
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

      <TableContainer mx={{ base: 2, md: 52 }}>
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
            {AffiliatesData.map((info, index) => (
              <Tr key={index}>
                <Td fontWeight="bold">{info.email}</Td>
                <Td fontWeight="bold">{info.moviment}</Td>
                <Td fontWeight="bold">{info.cashin}</Td>
                <Td fontWeight="bold">{info.cashout}</Td>
                <Td fontWeight="bold">{info.totalRate}</Td>
                <Td fontWeight="bold">{info.porcentage}</Td>
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
      </TableContainer>
    </Box>
  )
}

export default Affiliates
