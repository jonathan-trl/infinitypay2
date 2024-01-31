import Settings from '@/src/components/Pages/Settings'
import { IClient } from '@/src/types/Client'
import { useEffect, useState } from 'react'

function MyAccountSettingsPage() {
  const [user, setUser] = useState<IClient>()

  const fetchUser = async () => {
    const user = localStorage.getItem('_u_account')
    setUser(JSON.parse(user!))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return user && <Settings isClient={false} user={user!} />
}

export default MyAccountSettingsPage
