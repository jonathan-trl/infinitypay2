import api from '@/src/api'
import {
  CreateExemptionRequest,
  UpdateExemptionRequest,
} from '@/src/types/Exception/Request'
import { ExemptionResponse } from '@/src/types/Exception/Response'

const createExemption = async (
  data: CreateExemptionRequest,
): Promise<CreateExemptionRequest> => {
  try {
    const response = await api.post('/exemptions', data)
    return response.data
  } catch (error) {
    console.error('Error creating exemption:', error)
    throw error
  }
}

const listExemptions = async (): Promise<ExemptionResponse[]> => {
  try {
    const response = await api.get('/exemptions')
    return response.data
  } catch (error) {
    console.error('Error listing exemptions:', error)
    throw error
  }
}

const updateExemption = async (
  id: string,
  data: UpdateExemptionRequest,
): Promise<ExemptionResponse> => {
  try {
    const response = await api.patch(`/exemptions/${id}`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating exemption with ID ${id}:`, error)
    throw error
  }
}

const deleteExemption = async (id: string) => {
  try {
    const response = await api.delete(`/exemptions/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting exemption with ID ${id}:`, error)
    throw error
  }
}

const getExemption = async (id: string) => {
  try {
    const response = await api.get(`/exemptions/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting exemption with ID ${id}:`, error)
    throw error
  }
}

const ExemptionService = {
  createExemption,
  listExemptions,
  updateExemption,
  deleteExemption,
  getExemption,
}

export default ExemptionService
