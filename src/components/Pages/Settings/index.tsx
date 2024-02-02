import useCustomToast from '@/src/hooks/useCustomToast'
import AccountService from '@/src/services/AccountService'
import AdminAffiliateService from '@/src/services/AdminAffiliateService'
import ClientService from '@/src/services/ClientService'
import { GetAccountExtractRequestParams } from '@/src/types/Account/Request'
import { AccountExtractMovements } from '@/src/types/Account/Response'
import { IClient } from '@/src/types/Client'
import { formatDate } from '@/src/utils/formatDate'
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Info } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import Deposits from './Deposits'
import InternalTransfer from './InternalTransfer'
import PixKeyWithdrawal from './PixKeyWithdrawal'
import QRCodeWithdrawal from './QRCodeWithdrawal'
import Situation from './Situation'
import UserInfo from './UserInfo'

interface SettingsProps {
  isClient: boolean
  userId?: string
}

function Settings({ isClient, userId }: SettingsProps) {
  const [user, setUser] = useState<IClient>()
  const [extract, setExtract] = useState<AccountExtractMovements[]>([])
  const { showToast } = useCustomToast()

  const fetchExtract = async () => {
    try {
      if (user) {
        const params: GetAccountExtractRequestParams = {
          account: user.account[0].account,
          documentNumber: user.documentNumber,
        }

        const newExtract = await AccountService.getAccountExtract(params)

        setExtract(newExtract.body.movements)
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
  }

  const fetchUser = () => {
    if (isClient) {
      fetchUserIsClient(userId!)
    } else {
      fetchUserAdminAffiliate()
    }
  }

  const fetchUserAdminAffiliate = async () => {
    const loggedId = localStorage.getItem('_uid')
    try {
      const user: IClient =
        await AdminAffiliateService.getAdminAffiliateDetails(loggedId!)
      localStorage.setItem('_u_account', JSON.stringify(user))
      setUser(user)
      return user
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
  }

  const fetchUserIsClient = async (userId: string) => {
    try {
      const user: IClient = await ClientService.getById(userId as string)

      setUser(user)

      return user
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error)
      showToast(
        'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
        'error',
      )
    }
  }

  useEffect(() => {
    fetchExtract()
    fetchUser()
  }, [])

  return (
    <Box flex={1} ml={{ base: 0, md: 52 }}>
      {user && <UserInfo isClient={isClient} user={user} />}

      {user && (
        <Situation
          isClient={isClient}
          user={user}
          fetchUser={() => fetchUser()}
        />
      )}

      {user && <Deposits isClient={isClient} user={user} />}

      <Text fontWeight="bold" color="black" fontSize={19} w="100%" mt={10}>
        SAQUES
      </Text>

      {user && <QRCodeWithdrawal user={user} />}

      {user && !isClient && <PixKeyWithdrawal user={user} />}

      {user && <InternalTransfer isClient={isClient} user={user} />}

      <Text fontWeight="bold" color="black" fontSize={19} w="100%" mt={20}>
        EXTRATO
      </Text>

      <TableContainer ml={{ base: 0, md: 52 }}>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>USUÁRIO</Th>
              <Th>DATA</Th>
              <Th>TIPO</Th>
              <Th>STATUS</Th>
              <Th>TOTAL</Th>
              <Th>LÍQUIDO</Th>
              <Th>AÇÕES</Th>
            </Tr>
          </Thead>
          <Tbody>
            {extract &&
              extract.map((movement) => (
                <Tr key={movement.id}>
                  <Td fontWeight={'bold'}>{movement.name}</Td>
                  <Td fontWeight={'bold'}>{formatDate(movement.createDate)}</Td>
                  <Td fontWeight={'bold'}>{movement.balanceType}</Td>
                  <Td fontWeight={'bold'}>{movement.status}</Td>
                  <Td fontWeight={'bold'}>
                    {movement.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Td>
                  <Td fontWeight={'bold'}>
                    {movement.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Td>
                  <Td fontWeight={'bold'}>
                    <Info color="black" size={20} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        {extract.length === 0 && <Text>Nenhum item encontrado!</Text>}
      </TableContainer>
    </Box>
  )
}

export default Settings
