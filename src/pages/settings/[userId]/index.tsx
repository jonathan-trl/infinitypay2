import Settings from '@/src/components/Pages/Settings'
import ClientService from '@/src/services/ClientService'
import { IClient } from '@/src/types/Client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function UserSettingsPage() {
  const router = useRouter()
  const { userId } = router.query
  const [user, setUser] = useState<IClient>()

  const fetchUser = async () => {
    try {
      const user = await ClientService.getById(userId as string)

      setUser(user)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [userId])

  return userId && user && <Settings isClient={true} user={user!} />
}

export default UserSettingsPage
