import { Box, Text, Input as ChakraInput, InputProps } from '@chakra-ui/react'
type Props = InputProps & {
  title?: string
}
export function Input({ title, ...rest }: Props) {
  return (
    <Box ml={52} my={5}>
      <Text fontWeight={'bold'} color={'black'} fontSize={19}>
        {title}
      </Text>
      <ChakraInput borderColor={'black'} borderWidth={2} w={'full'} {...rest} />
    </Box>
  )
}
