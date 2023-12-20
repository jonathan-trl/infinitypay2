import { Button } from '@/src/components/Button'
import { ButtonAccount } from '@/src/components/ButtonAccount'
import { ButtonSearch } from '@/src/components/ButtonSearch'
import { Input } from '@/src/components/Input'
import { Data } from '@/src/data/InfoData'
import {
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button as NativeButton,
  Center,
} from '@chakra-ui/react'
import { ArrowsClockwise, Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormatDataProps = {
  cpf: string
  phone: string
  email: string
}
function NewAcounts() {
  const router = useRouter()
  const newAccountSchema = yup.object({
    cpf: yup.string().required('Informe O CPF'),
    phone: yup.string().required('Informe o Telefone'),
    email: yup.string().required('Informe o E-mail'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormatDataProps>({
    resolver: yupResolver(newAccountSchema),
  })
  async function handleNewAccount({ cpf }: FormatDataProps) {
    console.log('Cpf:', cpf)
  }
  return (
    <Box flex={1} ml={52}>
      <Text
        fontSize={{ base: 20, md: 30 }}
        fontWeight="bold"
        color="black"
        mb={3}
        mt={4}
      >
        Nova Conta
      </Text>
      <Text
        fontSize={{ base: 14, md: 19 }}
        fontWeight="bold"
        color="black"
        mb={3}
        mt={4}
      >
        (*) Campos obrigatórios
      </Text>
      <Text
        fontSize={{ base: 14, md: 19 }}
        fontWeight="bold"
        color="black"
        mb={3}
        mt={4}
      >
        ATENÇÃO - Consulta de CPF apenas para criar contas. Consulta extra será
        cobrado R$ 5,10 por consulta e em caso de excessos sua conta poderá ser
        banida da plataforma
      </Text>
      <HStack justifyContent={'space-between'}>
        <Box>
          <HStack spacing={4} alignItems={'center'}>
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="CPF*"
                  value={value}
                  errorMessage={errors.cpf?.message}
                  onChange={onChange}
                />
              )}
            />

            <ButtonSearch />
          </HStack>

          <HStack spacing={4}>
            <Input title="Nome*" />
          </HStack>
          <HStack spacing={4}>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Telefone*"
                  value={value}
                  errorMessage={errors.phone?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>
          <HStack spacing={4}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="E-mail*"
                  value={value}
                  errorMessage={errors.email?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Input title="Nome da Mãe*" />
          </HStack>

          <HStack spacing={4}>
            <Input title="Nome Social" />
          </HStack>

          <HStack spacing={4}>
            <Input title="Data de Nascimento*" />
          </HStack>
        </Box>

        <Box mx={20}>
          <HStack spacing={4} alignItems={'center'}>
            <Input title="Pessoa Politicamente Exposta*" />
          </HStack>

          <HStack spacing={4}>
            <Input title="CEP*" />
            <ButtonSearch />
          </HStack>

          <HStack spacing={4}>
            <Input title="Número*" />
          </HStack>

          <HStack spacing={4}>
            <Input title="Rua*" />
          </HStack>

          <HStack spacing={4}>
            <Input title="Complemento" />
          </HStack>

          <HStack spacing={4}>
            <Input title="Bairro*" />
          </HStack>

          <HStack spacing={4}>
            <Input title="Cidade*" />
          </HStack>

          <HStack spacing={4}>
            <Input title="UF*" />
          </HStack>
        </Box>
      </HStack>
      <HStack mb={4}>
        <Button
          mr={4}
          title="Criar Conta"
          w="32"
          mt={7}
          onClick={handleSubmit(handleNewAccount)}
        />
        <Button title="Cancelar" w="32" mt={7} />
      </HStack>
    </Box>
  )
}

export default NewAcounts
