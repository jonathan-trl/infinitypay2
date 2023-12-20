import { ButtonProps, Button } from '@chakra-ui/react'
import { MagnifyingGlass } from '@phosphor-icons/react'
type Props = ButtonProps

export function ButtonSearch({ ...rest }: Props) {
  return (
    <Button bg={'black'} {...rest}>
      <MagnifyingGlass size={32} color="white" />
    </Button>
  )
}
