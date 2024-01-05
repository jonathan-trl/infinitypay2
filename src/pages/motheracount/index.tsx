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

function MotherAcount() {
  const [active, SetActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(true)
  const [amount, setAmount] = useState('')
  const [loading2, setLoading2] = useState(false)
  const [showPopover, setShowPopover] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const handleCopyClick = () => {
    const inputElement = document.getElementById('depositKeyInput')

    if (inputElement instanceof HTMLInputElement) {
      inputElement.select()
      const inputValue = inputElement.value

      try {
        navigator.clipboard.writeText(inputValue).then(() => {
          console.log('Texto copiado para a área de transferência:', inputValue)
        })
      } catch (err) {
        console.error('Erro ao copiar para a área de transferência:', err)
      }
    }
  }

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
    <VStack p={4} align="stretch" ml={{ base: 0, md: 52 }}>
      <HStack justifyContent="space-between" w="100%">
        <Text fontSize={{ base: 20, md: 30 }} fontWeight="bold" color="black">
          Configuração de usuário
        </Text>
        <Button title="Solicitar Isenção" w={{ base: 'full', md: '32' }} />
      </HStack>

      <HStack spacing={4} w="100%">
        <VStack align="start" spacing={4} w={{ base: 'full', md: '50%' }}>
          <Input title="Nº da conta" placeholder="300203902839" h="12" />
          <Input title="Informações" placeholder="JACKSON VARGES" h="12" />
          <Input title="CPF*" placeholder="83974937902" h="12" />
        </VStack>

        <VStack align="start" spacing={4} w={{ base: 'full', md: '50%' }}>
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

      <VStack align="start" spacing={4} w="100%">
        <Text fontWeight="bold" color="black" fontSize={19}>
          Situação
        </Text>
        <HStack
          spacing={{ base: 2, md: 4 }}
          flexDirection={{ base: 'column', md: 'row' }}
        >
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
            <HStack flexDirection={{ base: 'column', md: 'row' }}>
              <Text color="red" m={10} fontWeight="bold">
                Desativado
              </Text>

              <Popover>
                <PopoverTrigger>
                  <Button title="ATIVAR (chave pix CPF)" />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent
                    w={{ base: 'full', md: '96' }}
                    h={{ base: '240', md: '80' }}
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
                            w={{ base: 'full', md: '72' }}
                            h="10"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <Button
                            title="ATIVAR COM SALDO DA CONTA MÃE"
                            w={{ base: 'full', md: '72' }}
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

      <Text fontWeight="bold" color="black" fontSize={19} w="100%">
        DEPÓSITOS
      </Text>
      <HStack spacing={{ base: 2, md: 4 }} w="100%">
        <Input
          id="depositKeyInput"
          title="Chave para depósito na conta"
          placeholder="c4ac9e67-87c-76b"
          h="12"
          w={{ base: 'full', md: 52 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          title="COPIAR"
          w={{ base: 40, md: '32' }}
          mt={{ base: 12, md: 6 }}
          right={{ base: 0, md: 14 }}
          onClick={handleCopyClick}
        />
      </HStack>

      <HStack spacing={{ base: 2, md: 4 }} w="100%">
        <Input
          title="Gerar novo depósito"
          placeholder="Valor R$ 0,00"
          h="12"
          w={{ base: 'full', md: 52 }}
        />
        <Button
          title="GERAR"
          w={{ base: 40, md: '32' }}
          mt={{ base: 4, md: 6 }}
        />
      </HStack>

      <Text fontWeight="bold" color="black" fontSize={19} w="100%" mt={10}>
        SAQUES
      </Text>
      <HStack spacing={{ base: 2, md: 4 }} w="100%">
        <Input
          title="QR Code para Saque"
          placeholder="Digite o copia e cola"
          h="12"
          w={{ base: 'full', md: 52 }}
        />

        <Popover isOpen={showPopover} onClose={() => setShowPopover(false)}>
          <PopoverTrigger>
            {loading2 ? (
              <Spinner
                size={'lg'}
                color="black"
                mx={{ base: 2, md: 0 }}
                mt={{ base: 3, md: 0 }}
              />
            ) : (
              <Button
                title="Buscar"
                w={{ base: 40, md: '32' }}
                mt={{ base: 4, md: 6 }}
                onClick={handleButtonClick}
              />
            )}
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              w={{ base: 'full', md: '96' }}
              h={{ base: '120', md: '80' }}
              justifyContent={'center'}
              alignItems={'center'}
            >
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
            </PopoverContent>
          </Portal>
        </Popover>

        {!loading && showPopover && (
          <Text textAlign="center" mt={5}>
            O Popover está visível após o carregamento.
          </Text>
        )}
      </HStack>

      <HStack spacing={{ base: 2, md: 4 }} w="100%">
        <Input
          title="Saque por Chave Pix"
          placeholder="82828830303"
          h="12"
          w={{ base: 'full', md: 52 }}
        />

        <Button
          title="Buscar"
          w={{ base: 40, md: '32' }}
          mt={{ base: 4, md: 6 }}
        />
      </HStack>

      <Text fontWeight="bold" color="black" fontSize={19} w="100%" mt={12}>
        TRANSFERÊNCIA INTERNA
      </Text>
      <HStack spacing={{ base: 2, md: 4 }} w="100%">
        <Input
          placeholder="Transferir para este CPF"
          h="12"
          w={{ base: 'full', md: 52 }}
        />

        <Popover>
          <PopoverTrigger>
            <Button title="Buscar" w={{ base: 40, md: '32' }} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              w={{ base: 'full', md: '96' }}
              h={{ base: '120', md: '60' }}
              justifyContent={'center'}
              alignItems={'center'}
            >
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
                <Input placeholder="50.000,00" color="black" w={'52'} h="10" />
                <Button title="Concluir" w="16" />
              </HStack>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>

      <Text fontWeight="bold" color="black" fontSize={19} w="100%" mt={20}>
        EXTRATO
      </Text>
      <TableContainer>
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
    </VStack>
  )
}

export default MotherAcount
