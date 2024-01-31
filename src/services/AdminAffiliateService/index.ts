import api from '@/src/api'
import {
  CreateAdminAffiliateRequest,
  UpdateAdminAffiliateRequest,
} from '@/src/types/AdminAffiliate/Request'
import { GetAffiliatesListResponse } from '@/src/types/AdminAffiliate/Response'

const createAdminAffiliate = async (data: CreateAdminAffiliateRequest) => {
  try {
    const response = await api.post(`/master`, data)
    return response.data
  } catch (error) {
    console.error('Error creating Admin or Affiliate:', error)
    throw error
  }
}

const getAffiliatesList = async (): Promise<GetAffiliatesListResponse[]> => {
  try {
    const response = await api.get(`/master`)
    return response.data
  } catch (error) {
    console.error('Error fetching affiliates list:', error)
    throw error
  }
}

const getAdminAffiliateDetails = async (id: string) => {
  try {
    const response = await api.get(`/master/${id}`)
    return response.data
  } catch (error) {
    console.error(
      `Error fetching details for Admin or Affiliate with ID ${id}:`,
      error,
    )
    throw error
  }
}

const updateAdminAffiliate = async (
  id: string,
  data: UpdateAdminAffiliateRequest,
) => {
  try {
    const response = await api.patch(`/master/${id}`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating Admin or Affiliate with ID ${id}:`, error)
    throw error
  }
}

const removeAffiliate = async (id: string) => {
  try {
    const response = await api.delete(`/master/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error removing Affiliate with ID ${id}:`, error)
    throw error
  }
}

const AdminAffiliateService = {
  createAdminAffiliate,
  getAffiliatesList,
  getAdminAffiliateDetails,
  updateAdminAffiliate,
  removeAffiliate,
}

export default AdminAffiliateService
