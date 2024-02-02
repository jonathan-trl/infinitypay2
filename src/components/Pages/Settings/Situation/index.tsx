import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import useCustomToast from '@/src/hooks/useCustomToast'
import PixService from '@/src/services/PixService'
import { IClient } from '@/src/types/Client'
import { CreatePixKeyRequest, KeyTypeProps } from '@/src/types/Pix/Request'
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
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { CheckCircle } from '@phosphor-icons/react'
import { useState } from 'react'

interface SituationProps {
  isClient: boolean
  user: IClient
  fetchUser: () => void
}

const Situation = ({ isClient, user, fetchUser }: SituationProps) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [inputAmount, setInputAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  const [showSpinnerLoading, setShowSpinnerLoading] = useState(false)
  const { showToast } = useCustomToast()

  const handleCheckIsClient = () => {
    if (isClient) {
      onToggle()
    } else {
      handleCreatePixKey('CPF')
    }
  }

  const handleCreatePixKey = async (keyType: KeyTypeProps) => {
    setShowSpinnerLoading(true)
    try {
      if (user) {
        const data: CreatePixKeyRequest = {
          documentNumber: user.documentNumber,
          account: user.account[0].account,
          keyType: 'EVP',
          useMotherAccount: !isClient,
        }

        if (keyType !== 'EVP') {
          if (isClient && inputAmount === '') {
            return false
          }
          data.value = parseFloat(inputAmount)
          data.key = user.documentNumber
          data.keyType = keyType
          data.useMotherAccount = !isClient
        }

        await PixService.createPixKey(user.id, data)

        fetchUser()
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao cadastrar a chave pix por CPF, tipo de chave não permitido!',
        'error',
      )
      onClose()
    }
    setShowSpinnerLoading(false)
    setInputAmount('')
    onClose()
  }

  const handleDeletePixKey = async () => {
    setShowSpinnerLoading(true)
    try {
      if (
        user &&
        user.account[0].keyPix &&
        user.account[0].keyPix?.length !== 0
      ) {
        await PixService.deletePixKey(
          user.account[0].keyPix[0].key,
          user.account[0].account,
        )

        fetchUser()
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
    setShowSpinnerLoading(false)
  }

  return (
    <VStack align="start" spacing={4} w="100%">
      <Text fontWeight="bold" color="black" fontSize={19}>
        Situação
      </Text>
      <HStack
        spacing={{ base: 2, md: 4 }}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        {user &&
        user.account[0].keyPix &&
        user.account[0].keyPix?.length !== 0 ? (
          <HStack>
            <Text color="#17c972" m={10} fontWeight="bold">
              Ativado
            </Text>
            <Button title="DESATIVAR CHAVE PIX" onClick={handleDeletePixKey} />
          </HStack>
        ) : (
          <HStack flexDirection={{ base: 'column', md: 'row' }}>
            <Text color="red" m={10} fontWeight="bold">
              Desativado
            </Text>

            {showSpinnerLoading && <Spinner />}

            <Button
              title="ATIVAR (chave pix CPF)"
              onClick={handleCheckIsClient}
            />
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              placement="right"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button display={'none'} colorScheme="pink" title="Target" />
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
                          Para ativar as contas, abasteça sua conta mãe via pix.
                          Obs. É obrigatório que a sua Conta Mãe esteja em nome
                          do operador. Caso não esteja, chamar no suporte para
                          alterar
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
  )
}

export default Situation
