import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type {
  GetUserWorkoutPlanResponse,
  GetUserWorkoutPlansResponse
} from './types/response'

export const getUserWorkoutPlans = () =>
  fetchApiClient<GetUserWorkoutPlansResponse>('/user/workout-plans')

export const getUserWorkoutPlansQueryOptions = () =>
  queryOptions({
    queryKey: ['getUserWorkoutPlans'],
    queryFn: () => getUserWorkoutPlans(),
    deferStream: true
  })

export const getUserWorkoutPlan = (id: string) =>
  fetchApiClient<GetUserWorkoutPlanResponse>(`/user/workout-plans/${id}`)

export const getUserWorkoutPlanQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['getUserWorkoutPlan', id],
    queryFn: () => getUserWorkoutPlan(id),
    deferStream: true
  })
