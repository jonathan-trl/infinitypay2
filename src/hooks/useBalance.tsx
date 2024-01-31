import { useState } from 'react'
import AccountService from '../services/AccountService'
import { GetAccountBalanceResponse } from '../types/Account/Response'

const useBalance = () => {
  const [balance, setBalance] = useState<GetAccountBalanceResponse | null>()

  const updateBalance = async (id?: string) => {
    const loggedId = localStorage.getItem('_uid')

    if (id || loggedId) {
      setBalance(null)
      console.log('id loggedid', id, loggedId)
      const response = await AccountService.getAccountBalance(id || loggedId!)
      setBalance(response)
    }
  }

  return { balance, updateBalance }
}

export default useBalance
