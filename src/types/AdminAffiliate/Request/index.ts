export type CreateAdminAffiliateRequest = {
  documentNumber: string
  name: string
  socialName: string
  email: string
  politicallyExposedPerson: boolean
  birthDate: string
  motherName: string
  phone: string
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  password: string
}

export type UpdateAdminAffiliateRequest = {
  documentNumber?: string
  socialName?: string
  email?: string
  politicallyExposedPerson?: boolean
  phone?: string
  cep?: string
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
}
