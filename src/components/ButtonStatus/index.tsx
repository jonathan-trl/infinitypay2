import { Button, Text } from '@chakra-ui/react'

type Props = {
  waiting?: boolean
  approved?: boolean
  denied?: boolean
  concluded?: boolean
}

export function ButtonStatus({ waiting, approved, denied, concluded }: Props) {
  let buttonColor = 'blue'

  if (waiting) {
    buttonColor = 'blue'
  } else if (approved) {
    buttonColor = 'green'
  } else if (denied) {
    buttonColor = 'red'
  } else if (concluded) {
    buttonColor = 'black'
  }

  return (
    <Button w={'28'} h={'7'} bg={buttonColor} rounded={0}>
      <Text color={'white'} fontSize={15}>
        {waiting
          ? 'AGUARDANDO'
          : approved
            ? 'APROVADO'
            : denied
              ? 'NEGADO'
              : concluded
                ? 'CONCLUÍDO'
                : ''}
      </Text>
    </Button>
  )
}
