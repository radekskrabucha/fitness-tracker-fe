import { queryOptions } from '@tanstack/solid-query'
import { authClient } from '~/lib/auth'
import { fetchApiClient } from '~/lib/fetch'
import type { CreateFitnessProfile, FitnessProfile } from '~/models/profile'
import type { ChangePasswordRequest, EditUserRequest } from './types/request'

export const changePassword = (req: ChangePasswordRequest) =>
  authClient.changePassword(req)

export const editUser = (req: EditUserRequest) => authClient.updateUser(req)

export const deleteUser = () => authClient.deleteUser()

export const createFitnessProfile = (req: CreateFitnessProfile) =>
  fetchApiClient<FitnessProfile>('/profile', {
    method: 'POST',
    body: req
  })

export const getUserFitnessProfile = () =>
  fetchApiClient<FitnessProfile>('/profile')

export const getUserFitnessProfileQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['getUserFitnessProfile', userId],
    queryFn: () => getUserFitnessProfile()
  })

export const editFitnessProfile = (req: Partial<CreateFitnessProfile>) =>
  fetchApiClient<FitnessProfile>('/profile', {
    method: 'PUT',
    body: req
  })

export const deleteFitnessProfile = () =>
  fetchApiClient<FitnessProfile>('/profile', {
    method: 'DELETE'
  })
