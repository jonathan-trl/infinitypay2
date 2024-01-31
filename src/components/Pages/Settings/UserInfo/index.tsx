import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import ModalExemption from '@/src/components/ModalExemption'
import useBalance from '@/src/hooks/useBalance'
import { IClient } from '@/src/types/Client'
import { formatDate } from '@/src/utils/formatDate'
import { HStack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { useEffect } from 'react'

interface UserInfoProps {
  isClient: boolean
  user: IClient
}

const UserInfo = ({ isClient, user }: UserInfoProps) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const { balance, updateBalance } = useBalance()

  useEffect(() => {
    if (user) {
      updateBalance(isClient ? user.id : '')
    }
  }, [])
  return (
    <>
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
            value={user ? user.account[0].account : ''}
            h="12"
          />
          <Input
            title="Informações"
            placeholder="JACKSON VARGES"
            value={user ? user.name : ''}
            h="12"
          />
          <Input
            title="CPF*"
            placeholder="83974937902"
            value={user ? user.documentNumber : ''}
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
              updateBalance(isClient && user ? user.id : '')
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

      <ModalExemption isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default UserInfo
