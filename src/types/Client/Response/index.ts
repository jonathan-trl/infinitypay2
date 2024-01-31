import { IClient } from '..'

export type ClientResponse = IClient

export type CountNewClientsResponse = {
  lastThirtyDays: number
  totalAccounts: number
  regularAccounts: number
}
