import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type { ChooseWorkoutPlanRequest } from './types/request'
import type { GetWorkoutPlanResponse } from './types/response'

export const getWorkoutPlan = (id: string) => {
  'use server'
  return fetchApiClient<GetWorkoutPlanResponse>(`/workout-plans/${id}`)
}

export const getWorkoutPlanQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['getWorkoutPlan', id],
    queryFn: () => getWorkoutPlan(id),
    deferStream: true
  })

export const chooseWorkoutPlan = (req: ChooseWorkoutPlanRequest) =>
  fetchApiClient<undefined>('/user/workout-plans', {
    method: 'POST',
    body: req
  })
