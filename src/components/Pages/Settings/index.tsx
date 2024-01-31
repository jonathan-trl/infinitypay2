import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import useBalance from '@/src/hooks/useBalance'
import AccountService from '@/src/services/AccountService'
import PixService from '@/src/services/PixService'
import { GetAccountExtractRequestParams } from '@/src/types/Account/Request'
import { GetAccountExtractResponse } from '@/src/types/Account/Response'
import { IClient } from '@/src/types/Client'
import { CreatePixKeyRequest, KeyTypeProps } from '@/src/types/Pix/Request'
import { formatDate } from '@/src/utils/formatDate'
import {
  Box,
  Center,
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
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { ArrowsClockwise, CheckCircle, Info } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import ModalExemption from '../../ModalExemption'
import InternalTransfer from './InternalTransfer'
import PixKeyWithdrawal from './PixKeyWithdrawal'
import QRCodeWithdrawal from './QRCodeWithdrawal'

interface SettingsProps {
  isClient: boolean
  user: IClient
}

function Settings({ isClient, user }: SettingsProps) {
  const [active, SetPixKeyActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(true)
  const [inputAmount, setInputAmount] = useState('')
  const [inputPixKeyValue, setInputPixKeyValue] = useState('')
  const { balance, updateBalance } = useBalance()
  const [inputValue, setInputValue] = useState('')
  const [extract, setExtract] = useState<GetAccountExtractResponse>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const user = {
  //   id: 'e5de8a6a-3864-401e-925f-9767c536df17',
  //   subAdminId: null,
  //   affiliateAdminId: null,
  //   name: 'Afiliado Teste',
  //   socialName: '',
  //   documentNumber: '18211466031',
  //   email: 'novoemailPF14@email.com',
  //   birthDate: '2003-10-20T00:00:00.000Z',
  //   motherName: 'Nome da Mãe',
  //   phone: '+5511981462568',
  //   politicallyExposedPerson: false,
  //   selfie: {
  //     key: 'AfiliadoTeste.png',
  //     name: 'Afiliado Teste',
  //     size: 115125,
  //     location:
  //       'https://prsonda.s3.us-east-005.backblazeb2.com/selfie/e5de8a6a-3864-401e-925f-9767c536df17/AfiliadoTeste.png',
  //   },
  //   accountsPf: [
  //     {
  //       id: '9b9e1432-d53c-4ba9-ac6d-5f7203ead990',
  //     },
  //   ],
  //   cep: '01153000',
  //   street: 'Rua',
  //   number: '123',
  //   complement: 'complemento',
  //   neighborhood: 'Bairro',
  //   city: 'Cidade',
  //   state: 'SP',
  //   country: 'Brasil',
  //   role: 'customerPF',
  //   status: 'CONFIRMED',
  //   onboardingId: '49fafb92-18e3-4f53-8d32-360dacee86da',
  //   kycStatus: 'PENDING',
  //   active: true,
  //   createdAt: '2023-12-19T20:05:44.235Z',
  //   updatedAt: '2024-01-25T19:36:35.134Z',
  //   account: [
  //     {
  //       id: '9b9e1432-d53c-4ba9-ac6d-5f7203ead990',
  //       userId: 'e5de8a6a-3864-401e-925f-9767c536df17',
  //       keyPix: [
  //         {
  //           key: '05fcdfe4-de8a-442e-ab23-f3398dd8da28',
  //           status: 'CONFIRMED',
  //           keyType: 'EVP',
  //         },
  //       ],
  //       statusPix: 'ATIVO ALEATÓRIA',
  //       bank: '13935893',
  //       agency: '0001',
  //       account: '300544731460',
  //       balance: 12.71,
  //       creditLimit: 0,
  //       rate: 0.1,
  //       exemption: false,
  //       onboardingId: '49fafb92-18e3-4f53-8d32-360dacee86da',
  //       status: 'ATIVO',
  //       role: 'customerPF',
  //       active: true,
  //       createdAt: '2023-12-19T20:05:51.486Z',
  //       updatedAt: '2024-01-24T17:02:01.186Z',
  //     },
  //   ],
  // }

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

  const fetchExtract = async () => {
    try {
      const params: GetAccountExtractRequestParams = {
        account: user.account[0].account,
        documentNumber: user.documentNumber,
      }

      const newExtract = await AccountService.getAccountExtract(params)

      setExtract(newExtract)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  const handleCreatePixKey = async (keyType: KeyTypeProps) => {
    try {
      const data: CreatePixKeyRequest = {
        documentNumber: user.documentNumber,
        account: user.account[0].account,
        keyType: 'EVP',
        useMotherAccount: isClient,
      }

      if (keyType !== 'EVP') {
        data.value = parseFloat(inputAmount)
        data.key = inputPixKeyValue
        data.keyType = keyType
      }

      const response = await PixService.createPixKey(data)

      if (response) {
        SetPixKeyActive(true)
      }
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  const handleDeletePixKey = async () => {
    try {
      const response = await PixService.deletePixKey(
        user.account[0].keyPix!,
        user.account[0].account,
      )

      if (response) {
        SetPixKeyActive(false)
      }
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  useEffect(() => {
    fetchExtract()
    updateBalance(isClient ? user.id : '')
  }, [])

  useEffect(() => {
    if (paymentCompleted) {
      const timer = setTimeout(() => {
        setPaymentCompleted(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [paymentCompleted])

  return (
    <Box flex={1} ml={{ base: 0, md: 52 }}>
      <HStack justifyContent="space-between" w="100%">
        <Text fontSize={{ base: 20, md: 30 }} fontWeight="bold" color="black">
          Configuração de usuário
        </Text>
        <Button
          title="Solicitar Isenção"
          w={{ base: 'full', md: '32' }}
          onClick={onOpen}
        />
      </HStack>

      <HStack spacing={4} w="100%">
        <VStack align="start" spacing={4} w={{ base: 'full', md: '50%' }}>
          <Input
            title="Nº da conta"
            placeholder={'29481893'}
            value={user.account[0].bank}
            h="12"
          />
          <Input
            title="Informações"
            placeholder="JACKSON VARGES"
            value={user.name}
            h="12"
          />
          <Input
            title="CPF*"
            placeholder="83974937902"
            value={user.documentNumber}
            h="12"
          />
        </VStack>

        <VStack align="start" spacing={4} w={{ base: 'full', md: '50%' }}>
          <Text fontWeight="bold" color="black" fontSize={19}>
            Saldo{' '}
            {balance?.balance.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }) ?? ''}
          </Text>
          <Text fontWeight="bold" color="black" fontSize={19}>
            Atualizado em {balance && formatDate(balance.updatedAt)}
          </Text>
          <HStack
            onClick={() => {
              updateBalance(isClient ? user.id : '')
            }}
            cursor={'pointer'}
          >
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
                onClick={handleDeletePixKey}
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
                    w={{ base: '96', md: '96' }}
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
                            value={inputAmount}
                            onChange={(e) => setInputAmount(e.target.value)}
                          />
                          <Input
                            placeholder="Chave pix"
                            color="black"
                            w={{ base: 'full', md: '72' }}
                            h="10"
                            value={inputPixKeyValue}
                            onChange={(e) =>
                              setInputPixKeyValue(e.target.value)
                            }
                          />
                          <Button
                            title="ATIVAR COM SALDO DA CONTA MÃE"
                            w={{ base: 'full', md: '72' }}
                            onClick={() => handleCreatePixKey('CPF')}
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

              {!isClient && (
                <Button
                  title="ATIVAR (chave pix ALEATÓRIA)"
                  onClick={() => handleCreatePixKey('EVP')}
                />
              )}
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
          value={user.account[0].keyPix || inputValue}
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

      <Text fontWeight="bold" color="black" fontSize={19} w="100%" mt={10}>
        SAQUES
      </Text>

      <QRCodeWithdrawal user={user} />

      {!isClient && <PixKeyWithdrawal user={user} />}

      <InternalTransfer isClient={isClient} user={user} />

      <Text fontWeight="bold" color="black" fontSize={19} w="100%" mt={20}>
        EXTRATO
      </Text>

      <TableContainer ml={{ base: 0, md: 52 }}>
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
            {extract &&
              extract.body.movements.map((movement) => (
                <Tr key={movement.id}>
                  <Td fontWeight={'bold'}>{movement.name}</Td>
                  <Td fontWeight={'bold'}>{formatDate(movement.createDate)}</Td>
                  <Td fontWeight={'bold'}>{movement.balanceType}</Td>
                  <Td fontWeight={'bold'}>{movement.status}</Td>
                  <Td fontWeight={'bold'}>
                    {movement.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Td>
                  <Td fontWeight={'bold'}>
                    {movement.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Td>
                  <Td fontWeight={'bold'}>
                    <Info color="black" size={20} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        {extract?.body.movements.length === 0 && (
          <Text>Nenhum item encontrado!</Text>
        )}
      </TableContainer>
      <ModalExemption isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Settings
