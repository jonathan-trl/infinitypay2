import { Button } from '@/src/components/Button'
import { ClientResponse } from '@/src/types/Client/Response'
import { formatDate } from '@/src/utils/formatDate'
import { HStack, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import { ArrowsClockwise } from '@phosphor-icons/react'
import router from 'next/router'

type TableBodyClientsProps = {
  clients: ClientResponse[]
}

const TableBodyClients = ({ clients }: TableBodyClientsProps) => {
  return (
    <Tbody>
      {clients.map((client, index) => (
        <Tr key={index}>
          <Td fontWeight={'bold'}>{formatDate(client.createdAt)}</Td>
          <Td fontWeight={'bold'}>{client.name}</Td>
          <Td fontWeight={'bold'}>
            <Text>{client.account.map((i) => i.account)}</Text>
          </Td>
          <Td fontWeight={'bold'}>{client.documentNumber}</Td>

          <Td fontWeight={'bold'}>{client.active ? 'Ativo' : 'Desativado'}</Td>
          {/* <Td fontWeight={'bold'}>
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
                    <Text textAlign={'center'} fontWeight="bold" color="black">
                      Enviando para BRUNA SOUZA DE BRITO
                    </Text>
                    <Text fontWeight="bold" color="black" textAlign={'center'}>
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
          </Td> */}
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

              <ArrowsClockwise onClick={() => console.log('Load')} size={18} />
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
  )
}

export default TableBodyClients
