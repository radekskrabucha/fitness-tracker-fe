import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type { PaginationParams } from '~/types/pagination'
import type { AddWorkoutSessionRequest } from './types/request'
import type {
  AddWorkoutSessionResponse,
  GetUserWorkoutPlanResponse,
  GetUserWorkoutPlansResponse
} from './types/response'

export const getUserWorkoutPlans = (paginationParams: PaginationParams) =>
  fetchApiClient<GetUserWorkoutPlansResponse>('/user/workout-plans', {
    query: paginationParams
  })

export const getUserWorkoutPlansQueryOptions = (
  userId: string,
  paginationParams?: PaginationParams
) =>
  queryOptions({
    queryKey: ['getUserWorkoutPlans', userId, paginationParams],
    queryFn: () => getUserWorkoutPlans(paginationParams),
    deferStream: true
  })

export const getUserWorkoutPlan = (id: string) =>
  fetchApiClient<GetUserWorkoutPlanResponse>(`/user/workout-plans/${id}`)

export const getUserWorkoutPlanQueryOptions = (id: string, userId: string) =>
  queryOptions({
    queryKey: ['getUserWorkoutPlan', id, userId],
    queryFn: () => getUserWorkoutPlan(id),
    deferStream: true
  })

export const addWorkoutSession = (req: AddWorkoutSessionRequest) =>
  fetchApiClient<AddWorkoutSessionResponse>('/user/workout-sessions', {
    method: 'POST',
    body: req
  })
