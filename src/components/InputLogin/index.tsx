import {
  Text,
  Input as ChakraInput,
  Box,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { EnvelopeSimple, Lock } from '@phosphor-icons/react'
import Image from 'next/image'
import EyeIcon from '@/src/assets/images/Eye-Icon.svg'

type Props = InputProps & {
  TitleInput?: string
  Icon?: boolean // Altere o tipo para string (URL da imagem)
  Placeholder: string
  ShowPassword?: () => void
  Ispassword?: boolean
}

export function InputLogin({
  TitleInput,
  Icon,
  Placeholder,
  ShowPassword,
  Ispassword,
  ...rest
}: Props) {
  return (
    <Box mt={3} mb={1} mx={3} {...rest}>
      <Text mx={2}>{TitleInput}</Text>
      <InputGroup borderColor={'#CED0D9'}>
        <InputLeftElement pointerEvents="none">
          {Icon ? (
            <EnvelopeSimple size={24} color={'#1ce686'} />
          ) : (
            <Lock size={24} color={'#1ce686'} />
          )}
        </InputLeftElement>
        <ChakraInput placeholder={Placeholder} />
        {Ispassword && (
          <InputRightElement onClick={ShowPassword}>
            {Icon && <Image src={EyeIcon} alt="" width={20} height={20} />}
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  )
}
