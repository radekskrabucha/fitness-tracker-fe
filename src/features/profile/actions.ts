import { authClient } from '~/lib/auth'
import type { ChangePasswordRequest, EditUserRequest } from './types/request'

export const changePassword = (req: ChangePasswordRequest) =>
  authClient.changePassword(req)

export const editUser = (req: EditUserRequest) => authClient.updateUser(req)
