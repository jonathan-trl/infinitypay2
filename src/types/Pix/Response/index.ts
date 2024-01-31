export type PixParty = {
  bank: string
  name: string
  taxId: string
  branch: string
  account: string
}

export type PixTransferResponse = {
  amount: number
  id: string
  accountRequestId: string
  clientCode: string
  transactionId: string
  endToEndId: string
  debitParty: PixParty
  creditParty: PixParty
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export type PixQrCodeReceiveResponse = {
  transactionId: number
  emvqrcps: string
  transactionIdentification: string
}

export type PixKeyResponse = {
  key: string
  status: string
  keyType: string
}

export type ConsultPixKeyResponse = {
  keyType: string
  key: string
  account: {
    participant: string
    branch: string
    account: string
    accountType: string
    createDate: string
  }
  owner: {
    type: string
    documentNumber: string
    name: string
  }
  endtoEndId: string
  participant: {
    date: string
    type: string
    name: string
    shortName: string
    startOperationDatetime: string
    ispb: string
  }
}

export type QrCodeEmvBase = {
  type: string
  collection: null
  payloadFormatIndicator: string
  merchantAccountInformation: {
    url: string
    gui: string
    key: string
    additionalInformation: null
    withdrawalServiceProvider: null
  }
  merchantCategoryCode: number
  transactionCurrency: number
  transactionAmount: number
  countryCode: string
  merchantName: string
  merchantCity: string
  postalCode: null
  initiationMethod: null
  transactionIdentification: string
}

export type ConsultQrCodeEmvResponse = QrCodeEmvBase & {
  creditPart: {
    keyType: string
    key: string
    account: {
      participant: string
      branch: string
      account: string
      accountType: string
      createDate: string
    }
    owner: {
      type: string
      documentNumber: string
      name: string
    }
    endtoEndId: string
  }
  dinamic: {
    calendar: {
      createdAt: string
      presentation: string
      dueDate: string
      validateAfterExpiration: number
    }
    debtor: {
      cpf: string
      cnpj: null
      name: string
    }
    receiver: {
      cnpj: null
      cpf: string
      fantasyName: null
      publicArea: string
      city: string
      state: string
      postalCode: string
    }
    transactionIdentification: string
    revision: string
    status: string
    key: string
    amount: {
      original: string
      abatement: string
      discount: string
      interest: string
      fine: string
      final: string
    }
    additionalInformation: null
  }
}
