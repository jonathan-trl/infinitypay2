export type KeyTypeProps = 'EVP' | 'CPF' | 'CNPJ' | 'Email' | 'Telefone'

export type CreatePixKeyRequest = {
  documentNumber: string
  account: string
  keyType: KeyTypeProps
  key?: string
  value?: number
  useMotherAccount: boolean
  motherAccount?: string
}

export type PixTransferRequest = {
  amount: number
  account: string
  key: string
  description: string
}

export type PixQrCodeTransferRequest = {
  account: string
  description: string
  emv: string
}

export type Merchant = {
  merchantCategoryCode: string
  postalCode: string
  city: string
  name: string
}

export type PixQrCodeReceiveRequest = {
  merchant: Merchant
  key: string
  amount: number
  tags: string[]
  transactionIdentification: string
  additionalInformation: string
}

export type ConsultQrCodeEmvRequest = {
  account: string
  emv: string
}

export type ConsultPixKeyRequest = {
  account: string
  key: string
}
