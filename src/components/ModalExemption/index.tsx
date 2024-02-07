import useCustomToast from '@/src/hooks/useCustomToast'
import ExemptionService from '@/src/services/ExemptionService'
import { CreateExemptionRequest } from '@/src/types/Exception/Request'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Input } from '../Input'

interface ModalExemptionProps {
  isOpen: boolean
  onClose: () => void
}

const ModalExemption = ({ isOpen, onClose }: ModalExemptionProps) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [service, setService] = useState('')
  const { showToast } = useCustomToast()

  const resetStates = () => {
    setLogin('')
    setPassword('')
    setDocumentNumber('')
    setName('')
    setAccount('')
    setService('')
  }

  const handleCreateExemption = async () => {
    try {
      const data: CreateExemptionRequest = {
        login,
        password,
        documentNumber,
        name,
        account,
        service,
      }

      const response = await ExemptionService.createExemption(data)

      if (response) {
        resetStates()
        // 'Insenção solicitada com sucesso!')
        onClose()
      }
      console.log(response)
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
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={['lg', 'xl']}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar novo pedido de isenção</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Input
            title="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            title="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            title="CPF"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
          />
          <Input
            title="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            title="Conta"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <Input
            title="Serviço"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Box>
            <Text fontSize={'small'} color={'red'} mb={3}>
              Obs: isenções somente para operação de Rollover de R$500,00,
              operações de valores menores não são elegíveis para isenção
            </Text>
            <Button colorScheme={'gray'} mr={3} onClick={handleCreateExemption}>
              Concluir
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalExemption
