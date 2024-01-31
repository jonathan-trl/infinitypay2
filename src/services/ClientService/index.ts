import api from '@/src/api'
import {
  CreateClientRequest,
  ListAllClientsParamsRequest,
} from '@/src/types/Client/Request'
import {
  ClientResponse,
  CountNewClientsResponse,
} from '@/src/types/Client/Response'

const create = async (data: CreateClientRequest): Promise<ClientResponse> => {
  try {
    const response = await api.post(`/customer-cpf`, data)
    return response.data
  } catch (error) {
    console.error('Error fetching account balance:', error)
    throw error
  }
}

const listAll = async (
  params?: ListAllClientsParamsRequest,
): Promise<ClientResponse[]> => {
  try {
    const response = await api.get(`/customer-cpf`, { params })
    return response.data
  } catch (error) {
    console.error('Error fetching client list:', error)
    throw error
  }
}

const getById = async (id: string): Promise<ClientResponse> => {
  try {
    const response = await api.get(`/customer-cpf/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching client with ID ${id}:`, error)
    throw error
  }
}

const getByDocumentNumber = async (
  documentNumber: string,
): Promise<ClientResponse> => {
  try {
    const response = await api.get(
      `/customer-cpf/document-number/${documentNumber}`,
    )
    return response.data
  } catch (error) {
    console.error(
      `Error fetching client with document number ${documentNumber}:`,
      error,
    )
    throw error
  }
}

const countNewClients = async (): Promise<CountNewClientsResponse> => {
  try {
    const response = await api.get(`/customer-cpf/count/new`)
    return response.data
  } catch (error) {
    console.error('Error counting new clients:', error)
    throw error
  }
}

const ClientService = {
  create,
  listAll,
  getById,
  getByDocumentNumber,
  countNewClients,
}

export default ClientService
