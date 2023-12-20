import { Button as ButtonChakra, ButtonProps, Text } from '@chakra-ui/react'
type Props = ButtonProps & {
  Title: string
}
export function ButtonLogin({ Title, ...rest }: Props) {
  return (
    <ButtonChakra bg="'#1ce686'" h={'10'} w={24} {...rest}>
      <Text color={'white'} fontFamily={'Poppins'}>
        {Title}
      </Text>
    </ButtonChakra>
  )
}
