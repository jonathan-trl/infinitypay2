import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import useCustomToast from '@/src/hooks/useCustomToast'
import AccountService from '@/src/services/AccountService'
import ClientService from '@/src/services/ClientService'
import { SendToMotherAccountRequest } from '@/src/types/Account/Request'
import { IClient } from '@/src/types/Client'
import {
  HStack,
  Popover,
  PopoverContent,
  Portal,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

interface InternalTransferProps {
  isClient: boolean
  user: IClient
}

const InternalTransfer = ({ isClient, user }: InternalTransferProps) => {
  const [inputDocumentNumber, setInputDocumentNumber] = useState('')
  const [inputTransferValue, setInputTransferValue] = useState('20')
  const [inputPixDescription, setInputPixDescription] = useState('')
  const [client, setClient] = useState<IClient>()
  const { showToast } = useCustomToast()
  const [showPopover, setShowPopover] = useState(false)
  const [loading, setLoading] = useState(false)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

  const handleTransfer = async () => {
    setButtonIsDisabled(true)
    try {
      if (user && client) {
        const data: SendToMotherAccountRequest = {
          amount: parseFloat(inputTransferValue),
          debitParty: {
            account: user?.account[0].account,
          },
          creditParty: {
            account: client?.account[0].account,
          },
          description: inputPixDescription,
        }

        if (isClient) {
          const response = await AccountService.sendToMotherAccount(
            user.id,
            data,
          )

          console.log(response)
        } else {
          const response = await AccountService.transferBetweenAccounts(data)

          console.log(response)
        }
      }

      showToast('Transferência realizada com sucesso!', 'success')
    } catch (error: any) {
      if (
        error.response &&
        error.response &&
        error.response.status === 400 &&
        error.response.data?.error
      ) {
        showToast(error.response.data.error, 'error')
      } else {
        showToast(
          'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
          'error',
        )
      }
    }
    setInputTransferValue('')
    setInputPixDescription('')
    setInputDocumentNumber('')
    setButtonIsDisabled(false)
    setShowPopover(false)
  }

  const searchByCpf = async () => {
    setLoading(true)
    try {
      const response =
        await ClientService.getByDocumentNumber(inputDocumentNumber)

      setClient(response)
      setShowPopover(true)
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.error
      ) {
        showToast(error.response.data.error, 'error')
      } else {
        showToast(
          'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
          'error',
        )
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Text fontWeight="bold" color="black" fontSize={19} w="100%" mt={12}>
        TRANSFERÊNCIA INTERNA
      </Text>
      <HStack spacing={{ base: 2, md: 4 }} w="100%">
        <Input
          placeholder="Transferir para este CPF"
          h="12"
          w={{ base: 'full', md: 52 }}
          value={inputDocumentNumber || ''}
          onChange={(e) => setInputDocumentNumber(e.target.value)}
        />

        {loading ? (
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
            isDisabled={inputDocumentNumber.trim() === ''}
            onClick={searchByCpf}
          />
        )}
        <Popover isOpen={showPopover} onClose={() => setShowPopover(false)}>
          <Portal>
            <PopoverContent
              w={{ base: '96', md: '96' }}
              h={{ base: '120', md: '60' }}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text textAlign={'center'} fontWeight="bold" color="black">
                Enviando para {client?.name}
              </Text>
              <Text fontWeight="bold" color="black" textAlign={'center'}>
                CPF {client?.documentNumber}
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
                  value={inputTransferValue || ''}
                  onChange={(e) => setInputTransferValue(e.target.value)}
                />
              </HStack>
              <HStack>
                <Text fontWeight="bold" color="black" textAlign={'center'}>
                  Descrição
                </Text>
                <Input
                  placeholder=""
                  h="10"
                  w={{ base: 'full', md: 52 }}
                  value={inputPixDescription}
                  onChange={(e) => setInputPixDescription(e.target.value)}
                />
              </HStack>

              <Button
                title="Concluir"
                w="16"
                onClick={handleTransfer}
                isDisabled={buttonIsDisabled}
              />
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
    </>
  )
}

export default InternalTransfer
