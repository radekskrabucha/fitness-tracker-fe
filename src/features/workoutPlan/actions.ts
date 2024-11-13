import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type { WorkoutPlanWithWorkouts } from '~/models/workoutPlan'

export const getWorkoutPlan = (id: string) => {
  'use server'
  return fetchApiClient<WorkoutPlanWithWorkouts>(`/workout-plans/${id}`)
}

export const getWorkoutPlanQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['getWorkoutPlan', id],
    queryFn: () => getWorkoutPlan(id),
    deferStream: true
  })
