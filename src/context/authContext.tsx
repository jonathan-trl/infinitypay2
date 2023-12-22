import React, { createContext, useContext, useState, ReactNode } from 'react'

// Defina a interface para o estado
interface State {
  userAuthenticated: boolean
}

// Defina a interface para as ações
interface Actions {
  login: () => void
  logout: () => void
}

// Combine as interfaces em uma única interface para o contexto
interface AuthContext extends State, Actions {}

const AuthContext = createContext<AuthContext | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode // Use ReactNode para tipar children
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false)

  const login = () => {
    setUserAuthenticated(true)
  }

  const logout = () => {
    setUserAuthenticated(false)
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
