export type CreateClientRequest = {
  documentNumber: string
  name: string
  phone: string
  email: string
  motherName: string
  socialName?: string
  birthDate: string
  politicallyExposedPerson: boolean
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export type ListAllClientsParamsRequest = {
  name?: string
  documentNumber?: string
  page?: string
  limit?: string
}
