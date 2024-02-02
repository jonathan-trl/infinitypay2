import { useState } from 'react'
import AccountService from '../services/AccountService'
import { GetAccountBalanceResponse } from '../types/Account/Response'
import useCustomToast from './useCustomToast'

const useBalance = () => {
  const [balance, setBalance] = useState<GetAccountBalanceResponse | null>()
  const { showToast } = useCustomToast()

  const updateBalance = async (id?: string) => {
    const loggedId = localStorage.getItem('_uid')

    if (id || loggedId) {
      try {
        setBalance(null)
        const response = await AccountService.getAccountBalance(id || loggedId!)
        setBalance(response)
      } catch (error) {
        console.error('Erro ao realizar a requisição:', error)
        showToast(
          'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
          'error',
        )
      }
    }
  }

  return { balance, updateBalance }
}

export default useBalance
