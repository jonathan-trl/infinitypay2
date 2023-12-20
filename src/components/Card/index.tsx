import { Box, BoxProps, Center, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
type BackgroundProps = BoxProps & {
  children: ReactNode
  TitleCard: string
}
export function Card({ children, TitleCard, ...rest }: BackgroundProps) {
  return (
    <Box h={'72'} w={'96'} bg={'#F4F5FA'} rounded={8} {...rest}>
      <Center mt={2} mb={3}>
        <Text fontSize={16} fontFamily={'Poppins'} color={'#6D6D6D'}>
          {TitleCard}
        </Text>
      </Center>

      <Box w={'full'} h={1} bg="#1ce686"></Box>
      {children}
    </Box>
  )
}
