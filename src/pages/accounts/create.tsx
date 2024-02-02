import { Button } from '@/src/components/Button'
import { ButtonSearch } from '@/src/components/ButtonSearch'
import { Input } from '@/src/components/Input'
import useCustomToast from '@/src/hooks/useCustomToast'
import ClientService from '@/src/services/ClientService'
import ConsultService from '@/src/services/ConsultService'
import { CreateClientRequest } from '@/src/types/Client/Request'
import { ConsultCepResponse } from '@/src/types/Consult/Response'
import { Box, FormControl, HStack, Select, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import * as yup from 'yup'

function CreateNewAccount() {
  const router = useRouter()
  const { showToast } = useCustomToast()

  const newAccountSchema = yup.object({
    documentNumber: yup.string().required('Informe o CPF'),
    name: yup.string().required('Informe o Nome'),
    phone: yup.string().required('Informe o Telefone'),
    email: yup.string().required('Informe o Email'),
    motherName: yup.string().required('Informe o nome da mãe'),
    socialName: yup.string(),
    birthDate: yup.string().required('Informe a data de nascimento'),
    politicallyExposedPerson: yup
      .boolean()
      .required('Informe se você é uma pessoa políticamente exposta '),
    cep: yup.string().required('Informe o CEP'),
    street: yup.string().required('Informe a Rua'),
    number: yup.string().required('Informe o Número'),
    complement: yup.string(),
    neighborhood: yup.string().required('Informe o Bairro'),
    city: yup.string().required('Informe a Cidade'),
    state: yup.string().required('Informe o Estado'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<CreateClientRequest>({
    resolver: yupResolver(newAccountSchema),
    defaultValues: {
      socialName: '',
      complement: '',
      politicallyExposedPerson: true,
    },
  })

  async function handleNewAccount(data: CreateClientRequest) {
    try {
      console.log(data)
      const response = await ClientService.create(data)
      console.log(response)
      showToast('Conta criada com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao tentar criar a conta, tente novamente mais tarde!',
        'error',
      )
    }
  }

  const handleConsultCpf = async () => {
    try {
      const cpf = getValues('documentNumber')
      const birthDate = getValues('birthDate')

      if (cpf === undefined) {
        setError('documentNumber', {
          type: 'required',
          message: 'Digite o CPF',
        })
      }

      if (birthDate === undefined) {
        setError('birthDate', {
          type: 'required',
          message: 'Digite a data de nascimento',
        })
      }

      if (cpf === undefined || birthDate === undefined) {
        return false
      }

      clearErrors('documentNumber')
      clearErrors('birthDate')

      const response = await ConsultService.consultCpf(cpf, birthDate)

      console.log(response)
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
  }

  const handleConsultCep = async () => {
    try {
      const cep = getValues('cep')
      const response: ConsultCepResponse = await ConsultService.consultCep(cep)
      setValue('neighborhood', response.bairro)
      setValue('city', response.localidade)
      setValue('street', response.logradouro)
      setValue('state', response.uf)
      setValue('neighborhood', response.bairro)
      clearErrors(['neighborhood', 'city', 'street', 'state', 'neighborhood'])
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
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
              name="documentNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="CPF*"
                  value={value || ''}
                  errorMessage={errors.documentNumber?.message}
                  onChange={onChange}
                />
              )}
            />

            <ButtonSearch onClick={handleConsultCpf} />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Nome*"
                  value={value || ''}
                  errorMessage={errors.name?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>
          <HStack spacing={4}>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    as={ReactInputMask}
                    title="Telefone*"
                    value={value || ''}
                    errorMessage={errors.phone?.message}
                    onChange={onChange}
                    mask="+55 (99) 99999-9999"
                    placeholder="+55 (12) 99131-3223"
                    id="telefone"
                  />
                </>
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
                  value={value || ''}
                  errorMessage={errors.email?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="motherName"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Nome da Mãe*"
                  value={value || ''}
                  errorMessage={errors.motherName?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="socialName"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Nome Social"
                  value={value || ''}
                  errorMessage={errors.socialName?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Data de Nascimento*"
                  type="date"
                  value={value || ''}
                  errorMessage={errors.birthDate?.message}
                  onChange={onChange}
                  onBlur={(e) => {
                    if (e.target.value !== '') {
                      const formattedDate = new Date(e.target.value)
                        .toISOString()
                        .split('T')[0]
                      onChange(formattedDate)
                    }
                  }}
                />
              )}
            />
          </HStack>
        </Box>

        <Box mx={20}>
          <HStack spacing={4} alignItems={'center'}>
            <Controller
              control={control}
              name="politicallyExposedPerson"
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <Text fontWeight={'bold'} color={'black'} fontSize={19}>
                    Pessoa políticamente exposta?*
                  </Text>
                  <Select
                    borderColor="black"
                    borderWidth={2}
                    w="full"
                    onChange={(e) => onChange(e.target.value)}
                    defaultValue={1}
                  >
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                  </Select>
                  {errors.politicallyExposedPerson
                    ? errors.politicallyExposedPerson?.message
                    : ''}
                </FormControl>
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="cep"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="CEP*"
                  value={value || ''}
                  errorMessage={errors.cep?.message}
                  onChange={onChange}
                />
              )}
            />
            <ButtonSearch onClick={handleConsultCep} />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="street"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Rua*"
                  value={value || ''}
                  errorMessage={errors.street?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="neighborhood"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Bairro*"
                  value={value || ''}
                  errorMessage={errors.neighborhood?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Cidade*"
                  value={value || ''}
                  errorMessage={errors.city?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="state"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="UF*"
                  value={value || ''}
                  errorMessage={errors.state?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="number"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Número*"
                  value={value || ''}
                  errorMessage={errors.number?.message}
                  onChange={onChange}
                />
              )}
            />
          </HStack>

          <HStack spacing={4}>
            <Controller
              control={control}
              name="complement"
              render={({ field: { onChange, value } }) => (
                <Input
                  title="Complemento"
                  value={value || ''}
                  errorMessage={errors.complement?.message}
                  onChange={onChange}
                />
              )}
            />
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

export default CreateNewAccount
