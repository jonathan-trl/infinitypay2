import { Button as ChakraButton, Text, ButtonProps } from '@chakra-ui/react'
type Props = ButtonProps & {
  title: string
}
export function Button({ title, ...rest }: Props) {
  return (
    <>
      <ChakraButton
        w={'fit-content'}
        bg={'#1ce686'}
        borderColor={'black'}
        borderWidth={1}
        px={10}
        {...rest}
      >
        <Text color={'black'}>{title}</Text>
      </ChakraButton>
    </>
  )
}
