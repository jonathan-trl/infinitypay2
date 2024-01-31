export type GetAccountExtractRequestParams = {
  account: string
  documentNumber: string
  dateFrom?: string
  dateTo?: string
  limitPerPage?: string
  page?: string
}

export type TransferBetweenAccountsRequest = {
  amount: number
  debitParty: {
    account: string
  }
  creditParty: {
    account: string
  }
  description: string
}

export type SendToMotherAccountRequest = TransferBetweenAccountsRequest

export type UpdateStatusAccountRequest = {
  account: string
  documentNumber: string
  status: 'BLOQUEADO' | 'DESBLOQUEADO'
  reason: string
}
