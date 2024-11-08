export type ChangePasswordRequest = {
  currentPassword: string
  newPassword: string
}

export type EditUserRequest = {
  name: string
}

export type DeleteUserRequest = {
  password: string
}
