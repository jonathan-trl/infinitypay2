import { AuthProvider, useAuth } from '../context/authContext'
import DashBoard from './dashboard'
import Login from './login'

function App() {
  const { userAuthenticated } = useAuth()

  return <>{userAuthenticated ? <DashBoard /> : <Login />}</>
}

export default App
