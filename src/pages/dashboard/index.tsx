import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import { Box, Center, Grid, HStack, Text, VStack } from '@chakra-ui/react'
import { ArrowsClockwise, Plus } from '@phosphor-icons/react'

function DashBoard() {
  return (
    <Box>
      <Text
        fontSize={{ base: 20, md: 30 }}
        fontWeight="bold"
        color="black"
        mx={{ base: 2, md: 52 }}
        mb={12}
        mt={4}
      >
        Configuração de usuário
      </Text>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={{ base: 4, md: 8 }}
      >
        <Input
          title="Nº da conta"
          placeholder="300203902839"
          color="black"
          w={{ base: 'full', md: '96' }}
          h="12"
        />

        <Grid
          templateColumns={{ base: '1fr', md: '1fr 3fr' }}
          gap={{ base: 4, md: 8 }}
        >
          <VStack align="start" spacing={4} mx={{ base: 2, md: 28 }}>
            <Text fontWeight="bold" color="black" fontSize={19}>
              Saldo R$ 10.018,57
            </Text>
            <Text fontWeight="bold" color="black" fontSize={19}>
              Atualizado em 06/10/2023, 14:30:30
            </Text>
            <HStack>
              <Text fontWeight="bold" color="#17c972" fontSize={17}>
                Atualizar
              </Text>
              <ArrowsClockwise color="#17c972" size={20} />
            </HStack>
          </VStack>
          <Button title="Solicitar Isenção" w="40" mx={10} />
        </Grid>
      </Grid>

      <Input
        title="Informações"
        placeholder="JACKSON VARGES SOUZA"
        color="black"
        w={{ base: 'full', md: '96' }}
        h="12"
      />
      <Input
        title="CPF*"
        placeholder="83974937902"
        w={{ base: 'full', md: 60 }}
        h="12"
      />

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
        <VStack align="start" spacing={4} mx={{ base: 2, md: 52 }}>
          <Text fontWeight="bold" color="black" fontSize={19}>
            Situação
          </Text>
          <Text color="#17c972" m={10} fontWeight="bold">
            Ativado
          </Text>
        </VStack>
        <Button title="DESATIVAR CHAVE ALEATÓRIA" />
      </Grid>

      <Text
        fontWeight="bold"
        color="black"
        fontSize={19}
        mx={{ base: 2, md: 52 }}
      >
        DEPÓSITOS
      </Text>

      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={8}
        mx={{ base: 2, md: 40 }}
      >
        <Input title="Chave para depósito na conta" />
        <Button title="COPIAR" w="32" mt={7} />
      </Grid>
    </Box>
  )
}

export default DashBoard
