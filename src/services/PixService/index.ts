import api from '@/src/api'
import {
  ConsultPixKeyRequest,
  ConsultQrCodeEmvRequest,
  CreatePixKeyRequest,
  PixQrCodeReceiveRequest,
  PixQrCodeTransferRequest,
  PixTransferRequest,
} from '@/src/types/Pix/Request'
import {
  ConsultPixKeyResponse,
  ConsultQrCodeEmvResponse,
  PixKeyResponse,
  PixQrCodeReceiveResponse,
  PixTransferResponse,
} from '@/src/types/Pix/Response'

const createPixKey = async (
  id: string,
  data: CreatePixKeyRequest,
): Promise<PixKeyResponse> => {
  try {
    const response = await api.post(`/pix/create-key-pix/${id}`, data)
    return response.data
  } catch (error) {
    console.error('Error creating PIX key:', error)
    throw error
  }
}

const deletePixKey = async (key: string, account: string) => {
  try {
    const response = await api.delete(
      `/pix/delete-key-pix/${key}?account=${account}`,
    )
    return response.data
  } catch (error) {
    console.error(`Error deleting PIX key ${key}:`, error)
    throw error
  }
}

const listPixKeys = async (id: string): Promise<PixKeyResponse[]> => {
  try {
    const response = await api.get(`/pix/list-key-pix/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error listing PIX keys for ID ${id}:`, error)
    throw error
  }
}

const listPixKeysByType = async (id: string): Promise<PixKeyResponse> => {
  try {
    const response = await api.get(`/pix/list-key-pix-type/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error listing PIX keys by type for ID ${id}:`, error)
    throw error
  }
}

const pixTransfer = async (
  data: PixTransferRequest,
): Promise<PixTransferResponse> => {
  try {
    const response = await api.post(`/pix/key-cash-out`, data)
    return response.data
  } catch (error) {
    console.error('Error performing PIX transfer:', error)
    throw error
  }
}

const pixQrCodeTransfer = async (
  data: PixQrCodeTransferRequest,
): Promise<PixTransferResponse> => {
  try {
    const response = await api.post(`/pix/qrcode-pix-cash-out`, data)
    return response.data
  } catch (error) {
    console.error('Error performing PIX QRCode transfer:', error)
    throw error
  }
}

const pixQrCodeReceive = async (
  data: PixQrCodeReceiveRequest,
): Promise<PixQrCodeReceiveResponse> => {
  try {
    const response = await api.post(`/pix/qrcode-pix-cash-in`, data)
    return response.data
  } catch (error) {
    console.error('Error receiving PIX QRCode:', error)
    throw error
  }
}

const consultPixKey = async (
  data: ConsultPixKeyRequest,
): Promise<ConsultPixKeyResponse> => {
  try {
    const response = await api.get(
      `/pix/consult-key-pix?account=${data.account}&key=${data.key}`,
    )
    return response.data
  } catch (error) {
    console.error('Error consulting PIX key:', error)
    throw error
  }
}

const consultQrCodeEmv = async (
  data: ConsultQrCodeEmvRequest,
): Promise<ConsultQrCodeEmvResponse> => {
  try {
    const response = await api.get(
      `/pix/consult-qrcode-emv?account=${data.account}&key=${data.emv}`,
    )
    return response.data
  } catch (error) {
    console.error('Error consulting QRCode EMV:', error)
    throw error
  }
}

const PixService = {
  createPixKey,
  deletePixKey,
  listPixKeys,
  listPixKeysByType,
  pixTransfer,
  pixQrCodeTransfer,
  pixQrCodeReceive,
  consultPixKey,
  consultQrCodeEmv,
}

export default PixService
