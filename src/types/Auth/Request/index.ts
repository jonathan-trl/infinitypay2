export type ForgotPasswordRequest = {
  username: string
}

export type UpdatePasswordRequest = {
  username: string
  password: string
  confirmPassword: string
}
