import { Button } from '@/src/components/Button'
import { ButtonAccount } from '@/src/components/ButtonAccount'
import { ButtonSearch } from '@/src/components/ButtonSearch'
import { Input } from '@/src/components/Input'
import { Data } from '@/src/data/InfoData'
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
import { ArrowsClockwise, Plus } from '@phosphor-icons/react'

function Acounts() {
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

      <HStack spacing={4}>
        <Input placeholder="Pesquisar Nome" />
        <ButtonSearch />
        <Button title="Nova Conta" />
      </HStack>

      <HStack spacing={4}>
        <Input placeholder="Pesquisar CPF" />
        <ButtonSearch />
      </HStack>

      <TableContainer mx={{ base: 2, md: 52 }}>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>DATA</Th>
              <Th>NOME</Th>
              <Th>CONTA</Th>
              <Th>DOCUMENTO</Th>
              <Th>STATUS</Th>
              <Th>CONTA</Th>
              <Th>SALDO</Th>
              <Th>AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Data.map((info, index) => (
              <Tr key={index}>
                <Td fontWeight={'bold'}>{info.date}</Td>
                <Td fontWeight={'bold'}>{info.name}</Td>
                <Td fontWeight={'bold'}>{info.account}</Td>
                <Td fontWeight={'bold'}>{info.document}</Td>

                <Td fontWeight={'bold'}>{info.status}</Td>
                <Td fontWeight={'bold'}>
                  <ButtonAccount />
                </Td>
                <Td fontWeight={'bold'}>
                  <HStack>
                    <Text>{info.balance}</Text>

                    <ArrowsClockwise
                      onClick={() => console.log('Load')}
                      size={18}
                    />
                  </HStack>
                </Td>
                <Td fontWeight={'bold'}>
                  <Box
                    w={5}
                    h={5}
                    borderWidth={1}
                    borderColor={'black'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={() => console.log('Ações')}
                  >
                    <Center>
                      <Plus size={19} />
                    </Center>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Acounts
