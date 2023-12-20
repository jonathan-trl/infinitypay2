import {
  Box,
  Text,
  Input as ChakraInput,
  InputProps,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Form } from 'react-hook-form'
import { INVALID } from 'zod'
type Props = InputProps & {
  title?: string
  errorMessage?: string | null
}
export function Input({
  title,
  errorMessage = null,
  isInvalid,
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
