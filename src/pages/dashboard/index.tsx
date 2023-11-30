import { Button } from '@/src/components/Button'
import { Input } from '@/src/components/Input'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react'
import { ArrowsClockwise, Plus } from '@phosphor-icons/react'

function DashBoard() {
  return (
    <Box>
      <Text
        fontSize={30}
        fontWeight={'bold'}
        color={'black'}
        mx={52}
        mb={'12'}
        mt={4}
      >
        Configuração de usuário
      </Text>
      <HStack>
        <Input
          title="Nº da conta"
          placeholder="300203902839"
          color={'black'}
          w={'96'}
          h={'12'}
        />
        <HStack>
          <VStack mx={28}>
            <Text fontWeight={'bold'} color={'black'} fontSize={19}>
              Saldo R$ 10.018,57
            </Text>
            <Text fontWeight={'bold'} color={'black'} fontSize={19}>
              Atualizado em 06/10/2023, 14:30:30
            </Text>
            <HStack>
              <Text fontWeight={'bold'} color={'#17c972'} fontSize={17}>
                Atualizar
              </Text>
              <ArrowsClockwise color="#17c972" size={20} />
            </HStack>
          </VStack>
          <Button title="Solicitar Isenção" w={'40'} mx={10} />
        </HStack>
      </HStack>

      <Input
        title="Informações"
        placeholder="JACKSON VARGES SOUZA"
        color={'black'}
        w={'96'}
        h={'12'}
      />
      <Input title="CPF*" placeholder="83974937902" w={60} h={'12'} />
      <HStack>
        <Box mx={52}>
          <Text fontWeight={'bold'} color={'black'} fontSize={19}>
            Situação
          </Text>

          <Text color={'#17c972'} m={10} fontWeight={'bold'}>
            Ativado
          </Text>
        </Box>

        <Button title="DESATIVAR CHAVE ALEATÓRIA" />
      </HStack>

      <Text fontWeight={'bold'} color={'black'} fontSize={19} mx={52}>
        DEPÓSITOS
      </Text>
      <HStack mx={'40'}>
        <Input title="Chave para depósito na conta" />
        <Button title="COPIAR" w={'32'} mt={7} />
      </HStack>
    </Box>
  )
}

export default DashBoard
