export type CreateExemptionRequest = {
  name: string
  documentNumber: string
  account: string
  service: string
  login: string
  password: string
}

export type UpdateExemptionRequest = {
  name?: string
  documentNumber?: string
  account?: string
  service?: string
  login?: string
  password?: string
}
