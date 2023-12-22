// hooks/useAuth.js
import { useState } from 'react'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => {
    // Lógica de autenticação aqui
    setIsAuthenticated(true)
  }

  const logout = () => {
    // Lógica de logout aqui
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}

export default useAuth
