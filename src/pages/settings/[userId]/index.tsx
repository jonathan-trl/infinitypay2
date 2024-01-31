import Settings from '@/src/components/Pages/Settings'
import { useRouter } from 'next/router'

function UserSettingsPage() {
  const router = useRouter()
  const { userId } = router.query

  return userId && <Settings isClient={true} userId={userId as string} />
}

export default UserSettingsPage
