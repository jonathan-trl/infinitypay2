import api from '@/src/api'
import {
  ForgotPasswordRequest,
  UpdatePasswordRequest,
} from '@/src/types/Auth/Request'
import { GetSessionResponse } from '@/src/types/Auth/Response'

const updatePassword = async (id: string, data: UpdatePasswordRequest) => {
  try {
    const response = await api.patch(`/auth/update-password/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error counting new clients:', error)
    throw error
  }
}

const forgotPassword = async (data: ForgotPasswordRequest) => {
  try {
    const response = await api.post(`/auth/forgot-password`, data)
    return response.data
  } catch (error) {
    console.error('Error counting new clients:', error)
    throw error
  }
}

const getSession = async (): Promise<GetSessionResponse> => {
  try {
    const response = await api.get(`/auth/session`)
    return response.data
  } catch (error) {
    console.error('Error counting new clients:', error)
    throw error
  }
}

const AuthService = { updatePassword, forgotPassword, getSession }

export default AuthService
