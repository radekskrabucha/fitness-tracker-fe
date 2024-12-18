import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type { GetWorkoutPlansResponse } from './types/response'

export const getWorkoutPlans = () => {
  'use server'
  return fetchApiClient<GetWorkoutPlansResponse>('/workout-plans')
}

export const getWorkoutPlansQueryOptions = () =>
  queryOptions({
    queryKey: ['getWorkoutPlans'],
    queryFn: () => getWorkoutPlans(),
    deferStream: true
  })
