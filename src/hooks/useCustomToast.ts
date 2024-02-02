import { Bounce, TypeOptions, toast } from 'react-toastify'

const useCustomToast = () => {
  const showToast = (message: string, type?: TypeOptions) => {
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
      type,
    })
  }

  return { showToast }
}

export default useCustomToast
