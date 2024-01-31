export type GetAccountBalanceResponse = {
  balance: number
  creditLimit: number
  updatedAt: string
}

export type AccountExtractMovements = {
  id: string
  name: string
  clientCode: string
  description: string
  createDate: string
  lastUpdateDate: string
  amount: number
  status: string
  balanceType: string
  movementType: string
}

export type GetAccountExtractResponse = {
  status: string
  version: string
  totalItems: number
  currentPage: number
  limitPerPage: number
  totalPages: number
  dateFrom: string
  dateTo: string
  body: {
    account: string
    documentNumber: string
    movements: AccountExtractMovements[]
  }
}

export type TransferBetweenAccountsResponse = {
  amount: number
  id: string
  accountRequestId: string
  clientCode: string
  transactionId: string
  endToEndId: string
  debitParty: {
    bank: string
    name: string
    taxId: string
    branch: string
    account: string
  }
  creditParty: {
    bank: string
    name: string
    taxId: string
    branch: string
    account: string
  }
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export type SendToMotherAccountResponse = TransferBetweenAccountsResponse

export type UpdateStatusAccountRequest = {
  cashIn: number
  cashOut: number
}
