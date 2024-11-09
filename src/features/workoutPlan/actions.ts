import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type { GetWorkoutPlanResponse } from './types/response'

export const getWorkoutPlan = (id: string) => {
  'use server'
  return fetchApiClient<GetWorkoutPlanResponse>(`/workout-plans/${id}`)
}

export const getWorkoutPlanQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['getWorkoutPlan', id],
    queryFn: () => getWorkoutPlan(id)
  })
