import { Button } from '@/src/components/Button'
import { ButtonAccount } from '@/src/components/ButtonAccount'
import { ButtonSearch } from '@/src/components/ButtonSearch'
import { Input } from '@/src/components/Input'
import ClientService from '@/src/services/ClientService'
import { ListAllClientsParamsRequest } from '@/src/types/Client/Request'
import { ClientResponse } from '@/src/types/Client/Response'
import { formatDate } from '@/src/utils/formatDate'
import {
  Box,
  Center,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { ArrowsClockwise, CheckCircle } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Acounts() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [amount, setAmount] = useState('')
  const [clients, setClients] = useState<ClientResponse[]>([])
  const [searchedClients, setSearchedClients] = useState<ClientResponse[]>([])
  const [inputDocumentNumber, setInputDocumentNumber] = useState('')
  const [inputName, setInputName] = useState('')

  const handleButtonClick = async () => {
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    setLoading(false)
    setPaymentCompleted(true)

    setTimeout(() => {
      setPaymentCompleted(false)
    }, 3000)
  }

  const fetchClientes = async () => {
    try {
      const newClients = await ClientService.listAll()
      setClients(newClients)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  const handleSearchByParams = async () => {
    try {
      const params: ListAllClientsParamsRequest = {
        name: inputName.trim(),
        documentNumber: inputDocumentNumber.trim().replace(/\D/g, ''),
      }

      if (params.documentNumber !== '' || params.name !== '') {
        const newClients = await ClientService.listAll(params)
        setSearchedClients(newClients)
      }
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
    setInputName('')
    setInputDocumentNumber('')
  }

  useEffect(() => {
    fetchClientes()
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
              onChange={(e) => setInputDocumentNumber(e.target.value)}
            />
          </Box>

          <ButtonSearch onClick={handleSearchByParams} />
        </Flex>

        <Button
          title="Nova Conta"
          onClick={() => router.push('/acounts/newacounts')}
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
              <Th>CONTA</Th>
              <Th>SALDO</Th>
              <Th>AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients.map((client, index) => (
              <Tr key={index}>
                <Td fontWeight={'bold'}>{formatDate(client.createdAt)}</Td>
                <Td fontWeight={'bold'}>{client.name}</Td>
                <Td fontWeight={'bold'}>
                  <Text>{client.account.map((i) => i.account)}</Text>
                </Td>
                <Td fontWeight={'bold'}>{client.documentNumber}</Td>

                <Td fontWeight={'bold'}>
                  {client.active ? 'Ativo' : 'Desativado'}
                </Td>
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
                    <Text>
                      {client.account.map((i) =>
                        i.balance.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }),
                      )}
                    </Text>

                    <ArrowsClockwise
                      onClick={() => console.log('Load')}
                      size={18}
                    />
                  </HStack>
                </Td>
                <Td fontWeight={'bold'}>
                  <Button
                    title="Editar"
                    onClick={() => router.push(`/settings/${client.id}`)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {clients.length === 0 && <Text>Nenhum item encontrado!</Text>}
      </TableContainer>
    </Box>
  )
}

export default Acounts
