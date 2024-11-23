import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type {
  GetUserWorkoutPlanResponse,
  GetUserWorkoutPlansResponse
} from './types/response'

export const getUserWorkoutPlans = () =>
  fetchApiClient<GetUserWorkoutPlansResponse>('/user/workout-plans')

export const getUserWorkoutPlansQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['getUserWorkoutPlans', userId],
    queryFn: () => getUserWorkoutPlans(),
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
