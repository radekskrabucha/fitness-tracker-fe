import { authClient } from '~/lib/auth'
import type { SignUpRequest } from './types/request'

export const signUp = (req: SignUpRequest) => authClient.signUp.email(req)
