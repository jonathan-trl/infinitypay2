import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import useCustomToast from '@/src/hooks/useCustomToast'
import PixService from '@/src/services/PixService'
import { IClient } from '@/src/types/Client'
import {
  ConsultQrCodeEmvRequest,
  PixQrCodeTransferRequest,
} from '@/src/types/Pix/Request'
import { ConsultQrCodeEmvResponse } from '@/src/types/Pix/Response'
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

interface QRCodeWithdrawalProps {
  user: IClient
}

const QRCodeWithdrawal = ({ user }: QRCodeWithdrawalProps) => {
  const [loading, setLoading] = useState(false)
  const [showPopover, setShowPopover] = useState(false)
  const [qrCodeResult, setQrCodeResult] = useState<ConsultQrCodeEmvResponse>()
  const [inputQrCode, setInputQrCode] = useState('')
  const [inputPixDescription, setInputPixDescription] = useState('')
  const { showToast } = useCustomToast()
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

  const handleConsultQRCodeEmv = async () => {
    setLoading(true)
    try {
      const data: ConsultQrCodeEmvRequest = {
        account: user.account[0].account,
        emv: inputQrCode,
      }

      const response = await PixService.consultQrCodeEmv(data)

      setQrCodeResult(response)
      setShowPopover(true)
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
    setLoading(false)
  }

  const handlePixQrCodeTransfer = async () => {
    setButtonIsDisabled(true)
    try {
      if (qrCodeResult) {
        const data: PixQrCodeTransferRequest = {
          account: qrCodeResult.creditPart.account.account,
          emv: inputQrCode,
          description:
            inputPixDescription || qrCodeResult.transactionIdentification,
        }

        const response = await PixService.pixQrCodeTransfer(data)

        console.log(response)
      }

      showToast('Transferência realizada com sucesso!', 'success')
    } catch (error: any) {
      if (error.response.status === 400 && error.response.data?.error) {
        showToast(error.response.data.error, 'error')
      } else {
        showToast(
          'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
          'error',
        )
      }
    }
    setInputPixDescription('')
    setInputQrCode('')
    setShowPopover(false)
    setButtonIsDisabled(false)
    setInputQrCode('')
  }

  return (
    <HStack spacing={{ base: 2, md: 4 }} w="100%">
      <Input
        title="QR Code para Saque"
        placeholder="Digite o copia e cola"
        h="12"
        w={{ base: 'full', md: 52 }}
        value={inputQrCode}
        onChange={(e) => setInputQrCode(e.target.value)}
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
              onClick={handleConsultQRCodeEmv}
              isDisabled={buttonIsDisabled}
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
              {qrCodeResult?.merchantName}
            </Text>
            <Text
              fontSize={22}
              fontWeight="bold"
              color="black"
              textAlign={'center'}
              mt={2}
            >
              {qrCodeResult?.transactionAmount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
            <Input
              title="Descrição"
              placeholder=""
              h="12"
              w={{ base: 'full', md: 52 }}
              value={inputPixDescription}
              onChange={(e) => setInputPixDescription(e.target.value)}
            />
            <Center>
              <Button
                title="PAGAR"
                w="16"
                mt={2}
                onClick={handlePixQrCodeTransfer}
                isDisabled={buttonIsDisabled}
              />
            </Center>
          </PopoverContent>
        </Portal>
      </Popover>

      {/* {!loading && showPopover && (
        <Text textAlign="center" mt={5}>
          O Popover está visível após o carregamento.
        </Text>
      )} */}

      <Text color={'red'}>
        Só é possível pagar QR Code Betano e Sportingbet
      </Text>
    </HStack>
  )
}

export default QRCodeWithdrawal
