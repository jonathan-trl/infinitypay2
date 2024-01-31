import { useRouter } from 'next/router'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import api from '../api'

interface State {
  userAuthenticated: boolean
}

interface Actions {
  login: (username: string, password: string) => void
  logout: () => void
}

interface AuthContext extends State, Actions {}

const AuthContext = createContext<AuthContext | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedAuthState = localStorage.getItem('_a')
    if (storedAuthState) {
      setUserAuthenticated(JSON.parse(storedAuthState))
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password })

      if (!response.data || !response.data.token) {
        throw new Error('Token não recebido da API')
      }

      const { token } = response.data

      localStorage.setItem('_a', 'true') // a = auth
      localStorage.setItem('_a_t', token) // t = token
      localStorage.setItem('_uid', response.data.id) // uid = usuario id
      setUserAuthenticated(true)
    } catch (error) {
      alert('Houve um erro ao realizar a requisição')
      console.error('Erro ao realizar a requisição:', error)
    }
  }

  const logout = () => {
    setUserAuthenticated(false)
    localStorage.removeItem('_a')
    localStorage.removeItem('_a_t')
    localStorage.removeItem('_uid')
    localStorage.removeItem('_u_account')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ userAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
