import api from '@/src/api'
import {
  ConsultCepResponse,
  ConsultCountResponse,
  ConsultCpfResponse,
} from '@/src/types/Consult/Response'

const consultCep = async (cep: string): Promise<ConsultCepResponse> => {
  try {
    const response = await api.get(`/consult/cep/${cep}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching CEP ${cep}:`, error)
    throw error
  }
}

const consultCount = async (): Promise<ConsultCountResponse> => {
  try {
    const response = await api.get(`/consult/count`)
    return response.data
  } catch (error) {
    console.error('Error fetching consult count:', error)
    throw error
  }
}

const consultCpf = async (
  cpf: string,
  birthDate: string,
): Promise<ConsultCpfResponse> => {
  try {
    const response = await api.get(`/consult/cpf/${cpf}/${birthDate}`)
    return response.data
  } catch (error) {
    console.error('Error fetching consult count:', error)
    throw error
  }
}

const ConsultService = { consultCep, consultCount, consultCpf }

export default ConsultService
