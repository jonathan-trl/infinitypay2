export type AccountPF = {
  id: string
}

export type Address = {
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  country: string
}

export type Account = {
  id: string
  userId: string
  keyPix: null | string
  statusPix: string
  bank: string
  agency: string
  account: string
  balance: number
  creditLimit: number
  rate: number
  exemption: boolean
  onboardingId: string
  status: string
  role: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export type Selfie = {
  key: string
  name: string
  size: number
  location: string
}

export type IClient = {
  id: string
  subAdminId: string
  affiliateAdminId: null | string
  documentNumber: string
  name: string
  socialName: string
  email: string
  birthDate: Date
  motherName: string
  phone: string
  politicallyExposedPerson: boolean
  selfie: null | Selfie
  accountsPf: AccountPF[]
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  country: string
  role: string
  status: string
  onboardingId: string
  kycStatus: string
  active: boolean
  createdAt: string
  updatedAt: string
  account: Account[]
}
