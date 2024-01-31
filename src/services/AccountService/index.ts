import api from '@/src/api'
import {
  GetAccountExtractRequestParams,
  SendToMotherAccountRequest,
  TransferBetweenAccountsRequest,
  UpdateStatusAccountRequest,
} from '@/src/types/Account/Request'
import {
  GetAccountBalanceResponse,
  GetAccountExtractResponse,
  SendToMotherAccountResponse,
  TransferBetweenAccountsResponse,
} from '@/src/types/Account/Response'

const getAccountBalance = async (
  id: string,
): Promise<GetAccountBalanceResponse> => {
  try {
    const response = await api.get(`/accounts/balance/${id}/`)
    return response.data
  } catch (error) {
    console.error('Error fetching account balance:', error)
    throw error
  }
}

const getAccountExtract = async (
  params: GetAccountExtractRequestParams,
): Promise<GetAccountExtractResponse> => {
  try {
    const response = await api.get(`/accounts/extract`, { params })
    return response.data
  } catch (error) {
    console.error('Error fetching account extract:', error)
    throw error
  }
}

const transferBetweenAccounts = async (
  data: TransferBetweenAccountsRequest,
): Promise<TransferBetweenAccountsResponse> => {
  try {
    const response = await api.post(`/accounts/transfer-between-accounts`, data)
    return response.data
  } catch (error) {
    console.error('Error transferring between accounts:', error)
    throw error
  }
}

const sendToMotherAccount = async (
  id: string,
  data: SendToMotherAccountRequest,
): Promise<SendToMotherAccountResponse> => {
  try {
    const response = await api.post(
      `/accounts/send-to-parent-account/${id}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error(`Error sending to parent account for account ${id}:`, error)
    throw error
  }
}

const updateStatusAccount = async (
  id: string,
  data: UpdateStatusAccountRequest,
) => {
  try {
    const response = await api.patch(
      `/accounts/update-status-account/${id}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error(`Error updating status for account ${id}:`, error)
    throw error
  }
}

const getTransactionsInformation = async (
  account: string,
): Promise<UpdateStatusAccountRequest> => {
  try {
    const response = await api.get(
      `/accounts/transactions-information/${account}`,
    )
    return response.data
  } catch (error) {
    console.error(
      `Error fetching transactions information for account ${account}:`,
      error,
    )
    throw error
  }
}

const AccountService = {
  getAccountBalance,
  getAccountExtract,
  transferBetweenAccounts,
  sendToMotherAccount,
  updateStatusAccount,
  getTransactionsInformation,
}

export default AccountService
