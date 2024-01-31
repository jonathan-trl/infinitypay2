import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import { IClient } from '@/src/types/Client'
import { HStack, Text } from '@chakra-ui/react'
import { useState } from 'react'

interface DepositsProps {
  isClient: boolean
  user: IClient
}

const Deposits = ({ user }: DepositsProps) => {
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

  return (
    <>
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
          value={
            user &&
            user.account[0].keyPix &&
            user.account[0].keyPix?.length !== 0
              ? user.account[0].keyPix[0].key
              : inputValue
          }
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
    </>
  )
}

export default Deposits
