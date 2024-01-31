export type ConsultCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export type ConsultCountResponse = {
  total: number
  news: number
}

export type ConsultCpfResponse = {
  createdOn: string
  birthOn: string
  status: string
  name: string
  federalTaxNumber: string
}
