import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type { GetUserWorkoutPlansResponse } from './types/response'

export const getUserWorkoutPlans = () =>
  fetchApiClient<GetUserWorkoutPlansResponse>('/user/workout-plans')

export const getUserWorkoutPlansQueryOptions = () =>
  queryOptions({
    queryKey: ['getUserWorkoutPlans'],
    queryFn: () => getUserWorkoutPlans(),
    deferStream: true
  })
