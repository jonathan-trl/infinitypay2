import { Box, Button, ButtonProps, Center, Text } from '@chakra-ui/react'

type Props = ButtonProps & {
  title?: string
}
export function ButtonAccount({ ...rest }: Props) {
  return (
    <Button w={' '} h={'16'} bg={'lightgray'} {...rest}>
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
