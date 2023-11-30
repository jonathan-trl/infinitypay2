import { Box, Button, Center, Text } from '@chakra-ui/react'

export function ButtonAccount() {
  return (
    <Button w={' '} h={'16'} bg={'lightgray'}>
      <Center>
        <Text fontWeight={'bold'} fontSize={12}>
          Enviar <br /> Saldo P/ <br />
          Conta
          <br /> Mãe
        </Text>
      </Center>
    </Button>
  )
}
