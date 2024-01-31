import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import AccountService from '@/src/services/AccountService'
import ClientService from '@/src/services/ClientService'
import { SendToMotherAccountRequest } from '@/src/types/Account/Request'
import { IClient } from '@/src/types/Client'
import {
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

interface InternalTransferProps {
  isClient: boolean
  user: IClient
}

const InternalTransfer = ({ isClient, user }: InternalTransferProps) => {
  const [inputDocumentNumber, setInputDocumentNumber] = useState('')
  const [inputTransferValue, setInputTransferValue] = useState('0')
  const [client, setClient] = useState<IClient>()

  const handleTransfer = async () => {
    try {
      const data: SendToMotherAccountRequest = {
        amount: parseFloat(inputTransferValue),
        debitParty: {
          account: user.account[0].account,
        },
        creditParty: {
          account: user.account[0].account,
        },
        description: 'Teste de transferencia',
      }

      if (isClient) {
        const response = await AccountService.sendToMotherAccount(user.id, data)

        console.log(response)
      } else {
        const response = await AccountService.transferBetweenAccounts(data)

        console.log(response)
      }
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  const searchByCpf = async () => {
    try {
      const response =
        await ClientService.getByDocumentNumber(inputDocumentNumber)

      setClient(response)
      console.log(response)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
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

        <Popover>
          <PopoverTrigger>
            <Button
              title="Buscar"
              w={{ base: 40, md: '32' }}
              isDisabled={inputDocumentNumber.trim() === ''}
              onClick={searchByCpf}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              w={{ base: '96', md: '96' }}
              h={{ base: '120', md: '60' }}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text textAlign={'center'}>Saldo: R$8,999,89</Text>
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
                <Button title="Concluir" w="16" onClick={handleTransfer} />
              </HStack>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
    </>
  )
}

export default InternalTransfer
