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
      } catch (error: any) {
        if (error.response.status === 400 && error.response.data?.error) {
          showToast(error.response.data.error, 'error')
        } else {
          showToast(
            'Houve um erro ao realizar a requisição, tente novamente mais tarde!',
            'error',
          )
        }
      }
    }
  }

  return { balance, updateBalance }
}

export default useBalance
