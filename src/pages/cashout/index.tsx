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
  TableCaption,
  TableContainer,
  Button as NativeButton,
  Center,
} from '@chakra-ui/react'
import { Info } from '@phosphor-icons/react'
import { ButtonSearch } from '@/src/components/ButtonSearch'
function CashOut() {
  return (
    <Box flex={1}>
      <Text
        fontSize={30}
        fontWeight={'bold'}
        color={'black'}
        mx={52}
        mb={'12'}
        mt={4}
      >
        Cash In
      </Text>
      <HStack>
        <Input placeholder="Pesquisar" />
        <ButtonSearch />
      </HStack>

      <TableContainer ml={52}>
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
                <Td fontWeight={'bold'}>{info.user}</Td>
                <Td fontWeight={'bold'}>{info.date}</Td>
                <Td fontWeight={'bold'}>{info.type}</Td>
                <Td fontWeight={'bold'}>{info.status}</Td>

                <Td fontWeight={'bold'}>{info.total}</Td>
                <Td fontWeight={'bold'}>{info.liquid}</Td>
                <Td fontWeight={'bold'}>
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
