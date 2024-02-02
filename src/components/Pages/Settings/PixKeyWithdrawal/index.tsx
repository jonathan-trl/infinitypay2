import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import useCustomToast from '@/src/hooks/useCustomToast'
import PixService from '@/src/services/PixService'
import { IClient } from '@/src/types/Client'
import {
  ConsultPixKeyRequest,
  PixTransferRequest,
} from '@/src/types/Pix/Request'
import { ConsultPixKeyResponse } from '@/src/types/Pix/Response'
import {
  Center,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

interface PixKeyWithdrawalProps {
  user: IClient
}

const PixKeyWithdrawal = ({ user }: PixKeyWithdrawalProps) => {
  const [loading, setLoading] = useState(false)
  const [showPopover, setShowPopover] = useState(false)
  const [pixKeyResult, setPixKeyResult] = useState<ConsultPixKeyResponse>()
  const [inputPixKey, setInputPixKey] = useState('')
  const [inputPixValue, setInputPixValue] = useState('')
  const { showToast } = useCustomToast()

  const handleConsultPixKey = async () => {
    try {
      const data: ConsultPixKeyRequest = {
        account: user.account[0].account,
        key: inputPixKey,
      }

      const response = await PixService.consultPixKey(data)

      console.log(response)
      setPixKeyResult(response)
      // setShowPopover(true)
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
    setShowPopover(true)
  }

  const handlePixTransfer = async () => {
    try {
      if (pixKeyResult) {
        const data: PixTransferRequest = {
          amount: 10.55,
          account: pixKeyResult?.account.account,
          key: pixKeyResult.key,
          description: 'Teste de transferencia',
        }

        const response = await PixService.pixTransfer(data)

        console.log(response)
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
  }

  return (
    <HStack spacing={{ base: 2, md: 4 }} w="100%">
      <Input
        title="Saque por Chave Pix"
        placeholder="1aBcDeFgHiJkLmNoPqRsT@banco"
        h="12"
        w={{ base: 'full', md: 52 }}
        value={inputPixKey}
        onChange={(e) => setInputPixKey(e.target.value)}
      />

      <Popover isOpen={showPopover} onClose={() => setShowPopover(false)}>
        <PopoverTrigger>
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
              mt={{ base: 4, md: 6 }}
              onClick={handleConsultPixKey}
              isDisabled={inputPixKey === ''}
            />
          )}
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            w={{ base: '96', md: '96' }}
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
              {pixKeyResult?.owner.name}
            </Text>
            <Input
              title="Valor do pix"
              placeholder="50"
              h="12"
              w={{ base: 'full', md: 52 }}
              value={inputPixValue}
              onChange={(e) => setInputPixValue(e.target.value)}
            />
            <Center>
              <Button title="PAGAR" w="16" mt={2} onClick={handlePixTransfer} />
            </Center>
          </PopoverContent>
        </Portal>
      </Popover>
    </HStack>
  )
}

export default PixKeyWithdrawal
