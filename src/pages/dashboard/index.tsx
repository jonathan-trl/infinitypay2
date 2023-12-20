import React, { useEffect, useState } from 'react'
import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import { CashOutData } from '@/src/data/CashOutData'
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
  VStack,
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
import {
  ArrowsClockwise,
  Plus,
  Info,
  Check,
  CheckCircle,
} from '@phosphor-icons/react'

function DashBoard() {
  const [active, SetActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(true)
  const [amount, setAmount] = useState('')
  const [loading2, setLoading2] = useState(false)
  const [showPopover, setShowPopover] = useState(false)

  const handleButtonClick = async () => {
    setLoading2(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    setLoading2(false)
    setShowPopover(true)
  }

  const handleActivate = async () => {
    try {
      setLoading(true)

      await simulatePayment()

      setTimeout(() => {
        setLoading(false)
        setPaymentCompleted(true)
      }, 3000)
    } catch (error) {
      console.error('Erro ao processar o pagamento:', error)
    }
  }

  const simulatePayment = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  useEffect(() => {
    if (paymentCompleted) {
      const timer = setTimeout(() => {
        setPaymentCompleted(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [paymentCompleted])
  return (
    <Box>
      <HStack justifyContent={'space-between'}>
        <Text
          fontSize={{ base: 20, md: 30 }}
          fontWeight="bold"
          color="black"
          mx={{ base: 2, md: 52 }}
          mb={12}
          mt={4}
        >
          Configuração de usuário
        </Text>
        <Button title="Solicitar Isenção" w="32" mt={10} mx={6} />
      </HStack>

      <HStack ml={52}>
        <VStack>
          <Input
            title="Nº da conta"
            placeholder="300203902839"
            color="black"
            w={{ base: 'full', md: '96' }}
            h="12"
          />

          <Input
            title="Informações"
            placeholder="JACKSON VARGES SOUZA"
            color="black"
            w={{ base: 'full', md: '96' }}
            h="12"
          />
          <Input
            title="CPF*"
            placeholder="83974937902"
            w={{ base: 'full', md: '96' }}
            h="12"
          />
        </VStack>
        <VStack align="start" spacing={4} mx={{ base: 2, md: 28 }}>
          <Text fontWeight="bold" color="black" fontSize={19}>
            Saldo R$ 10.018,57
          </Text>
          <Text fontWeight="bold" color="black" fontSize={19}>
            Atualizado em 06/10/2023, 14:30:30
          </Text>
          <HStack>
            <Text fontWeight="bold" color="#17c972" fontSize={17}>
              Atualizar
            </Text>
            <ArrowsClockwise color="#17c972" size={20} />
          </HStack>
        </VStack>
      </HStack>

      <VStack align="start" spacing={4} mx={{ base: 2, md: 52 }}>
        <Text fontWeight="bold" color="black" fontSize={19}>
          Situação
        </Text>
        <HStack>
          {active ? (
            <HStack>
              <Text color="#17c972" m={10} fontWeight="bold">
                Ativado
              </Text>
              <Button
                title="DESATIVAR CHAVE ALEATÓRIA"
                onClick={() => SetActive(false)}
              />
            </HStack>
          ) : (
            <HStack>
              <Text color="red" m={10} fontWeight="bold">
                Desativado
              </Text>

              <Popover>
                <PopoverTrigger>
                  <Button title="ATIVAR (chave pix CPF)" />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent
                    w={96}
                    h={80}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      {loading && (
                        <Box>
                          <Text
                            mb={6}
                            textAlign={'center'}
                            fontSize={20}
                            fontWeight={'bold'}
                          >
                            Aguarde...
                          </Text>
                          <Spinner
                            style={{
                              width: 100,
                              height: 100,
                              borderWidth: 6,
                              color: 'black',
                            }}
                          />
                        </Box>
                      )}
                      <Box justifyContent={'center'} alignItems={'center'}>
                        {paymentCompleted && (
                          <>
                            <Text
                              textAlign={'center'}
                              color="black"
                              fontSize={22}
                              fontWeight={'bold'}
                            >
                              Pagamento concluído! CPF já é a chave pix
                            </Text>
                            <Center>
                              <CheckCircle size={100} color="green" />
                            </Center>
                          </>
                        )}
                      </Box>

                      {!loading && !paymentCompleted && (
                        <VStack>
                          <Text
                            textAlign={'center'}
                            fontWeight="bold"
                            color="black"
                            fontSize={15}
                            mb={4}
                          >
                            Realize um depósito para ativar a conta. A ativação
                            tem custo de 5 reais. (Ex: Depósito de 100 reais,
                            saldo em conta será de 95 reais)
                          </Text>
                          <Input
                            placeholder="50.000,00"
                            color="black"
                            w={'72'}
                            h="10"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <Button
                            title="ATIVAR COM SALDO DA CONTA MÃE"
                            w="72"
                            onClick={handleActivate}
                            isLoading={loading}
                            loadingText="Aguarde..."
                            isDisabled={loading}
                          />
                          <Text
                            textAlign={'center'}
                            fontWeight="bold"
                            color="black"
                            fontSize={13}
                            mb={4}
                          >
                            Para ativar as contas, abasteça sua conta mãe via
                            pix. Obs. É obrigatório que a sua Conta Mãe esteja
                            em nome do operador. Caso não esteja, chamar no
                            suporte para alterar
                          </Text>
                        </VStack>
                      )}
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>

              <Button
                title="ATIVAR (chave pix ALEATÓRIA)"
                onClick={() => SetActive(true)}
              />
            </HStack>
          )}
        </HStack>
      </VStack>

      <Text
        fontWeight="bold"
        color="black"
        fontSize={19}
        mx={{ base: 2, md: 52 }}
      >
        DEPÓSITOS
      </Text>
      <HStack ml={80}>
        <Input
          title="Chave para depósito na conta"
          placeholder="c4ac9e67-87c-76b"
          color="black"
          w={{ base: 'full', md: '96' }}
          h="12"
        />
        <Button title="COPIAR" w="32" mt={7} />
      </HStack>

      <HStack ml={80}>
        <Input
          title="Gerar novo depósito"
          placeholder="Valor R$ 0,00"
          color="black"
          w={{ base: 'full', md: '96' }}
          h="12"
        />
        <Button title="COPIAR" w="32" mt={7} />
      </HStack>

      <Text
        fontWeight="bold"
        color="black"
        fontSize={19}
        mx={{ base: 2, md: 52 }}
        mt={10}
      >
        SAQUES
      </Text>
      <HStack ml={52}>
        <Input
          title="QR Code para Saque"
          placeholder="Digite o copia e cola"
          color="black"
          w={{ base: 'full', md: '96' }}
          h="12"
        />

        <Popover isOpen={showPopover} onClose={() => setShowPopover(false)}>
          <PopoverTrigger>
            {loading2 ? (
              <Spinner size={'lg'} color="black" mx={'6'} mt={3} />
            ) : (
              <Button
                title="Buscar"
                w="32"
                mt={7}
                onClick={handleButtonClick}
              />
            )}
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
                <Text
                  fontSize={19}
                  textAlign={'center'}
                  fontWeight="bold"
                  color="black"
                  mt={2}
                >
                  Okto Pagamentos S.A
                </Text>
                <Text
                  fontSize={22}
                  fontWeight="bold"
                  color="black"
                  textAlign={'center'}
                  mt={2}
                >
                  R$ 500,00
                </Text>
                <Center>
                  <Button title="PAGAR" w="16" mt={2} />
                </Center>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        {!loading && showPopover && (
          <Text textAlign="center" mt={5}>
            O Popover está visível após o carregamento.
          </Text>
        )}
      </HStack>

      <HStack ml={52}>
        <Input
          title="Saque por Chave Pix"
          placeholder="82828830303"
          color="black"
          w={{ base: 'full', md: '96' }}
          h="12"
        />

        <Button title="Buscar" w="32" mt={7} />
      </HStack>

      <Text
        fontWeight="bold"
        color="black"
        fontSize={19}
        mx={{ base: 2, md: 52 }}
        mt={12}
      >
        TRANSFERÊNCIA INTERNA
      </Text>
      <HStack>
        <Input
          placeholder="Transferir para este CPF"
          color="black"
          w={{ base: 'full', md: '96' }}
          h="12"
          ml={52}
        />

        <Popover>
          <PopoverTrigger>
            <Button title="Buscar" w="32" />
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
                <HStack>
                  <Text fontWeight="bold" color="black" textAlign={'center'}>
                    R$
                  </Text>
                  <Input
                    placeholder="50.000,00"
                    color="black"
                    w={'52'}
                    h="10"
                  />
                  <Button title="Concluir" w="16" />
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>

      <Text
        fontWeight="bold"
        color="black"
        fontSize={19}
        mx={{ base: 2, md: 52 }}
        mt={20}
      >
        EXTRATO
      </Text>
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

export default DashBoard
