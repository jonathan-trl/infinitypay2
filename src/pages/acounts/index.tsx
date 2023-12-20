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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Spinner,
} from '@chakra-ui/react'
import { ArrowsClockwise, CheckCircle, Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Acounts() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [amount, setAmount] = useState('')

  const handleButtonClick = async () => {
    setLoading(true)

    // Simula um processo de pagamento (substitua por sua lógica real)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setLoading(false)
    setPaymentCompleted(true)

    // Reseta o estado após 3 segundos (opcional)
    setTimeout(() => {
      setPaymentCompleted(false)
    }, 3000)
  }

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

      <HStack spacing={4} ml={52}>
        <Input placeholder="Pesquisar Nome" />
        <ButtonSearch />
        <Button
          title="Nova Conta"
          onClick={() => router.push('/acounts/newacounts')}
        />
      </HStack>

      <HStack spacing={4} ml={52}>
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
                  <Popover>
                    <PopoverTrigger>
                      <ButtonAccount />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent
                        w={96}
                        h={64}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Text textAlign={'center'}>Saldo: R$8,999,89</Text>
                          <Text
                            textAlign={'center'}
                            fontWeight="bold"
                            color="black"
                          >
                            Enviando para BRUNA SOUZA DE BRITO
                          </Text>
                          <Text
                            fontWeight="bold"
                            color="black"
                            textAlign={'center'}
                          >
                            CPF 8392883928
                          </Text>
                          {loading ? (
                            <Center>
                              <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="black"
                                size="xl"
                              />
                            </Center>
                          ) : paymentCompleted ? (
                            <Center>
                              <CheckCircle size={100} color="green" />
                            </Center>
                          ) : (
                            <HStack>
                              <Text
                                fontWeight="bold"
                                color="black"
                                textAlign={'center'}
                              >
                                R$
                              </Text>
                              <Input
                                placeholder="50.000,00"
                                color="black"
                                w={'52'}
                                h="10"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                              />
                              <Button
                                title="Concluir"
                                w="16"
                                onClick={handleButtonClick}
                                isDisabled={loading || paymentCompleted}
                              />
                            </HStack>
                          )}
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
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
