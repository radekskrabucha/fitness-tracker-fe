import { authClient } from '~/lib/auth'
import type { ChangePasswordRequest } from './types/request'

export const changePassword = (req: ChangePasswordRequest) =>
  authClient.changePassword(req)
