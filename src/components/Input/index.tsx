import {
  Box,
  Input as ChakraInput,
  FormControl,
  InputProps,
  Text,
} from '@chakra-ui/react'
type Props = InputProps & {
  title?: string
  errorMessage?: string | null
  mask?: string
}
export function Input({
  title,
  errorMessage = null,
  isInvalid,
  mask,
  ...rest
}: Props) {
  const Invalid = !!errorMessage || isInvalid
  return (
    <Box>
      <Text fontWeight={'bold'} color={'black'} fontSize={19}>
        {title}
      </Text>
      <FormControl>
        <ChakraInput
          borderColor={'black'}
          borderWidth={2}
          w={'full'}
          isInvalid={Invalid}
          {...rest}
        />
        <Text mt={2} fontSize={13} fontWeight={'bold'} color={'#D62E19'}>
          {errorMessage}
        </Text>
      </FormControl>
    </Box>
  )
}
