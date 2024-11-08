import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type { WorkoutPlanWithWorkouts } from '~/models/workoutPlan'

export const getWorkoutPlans = () => {
  'use server'
  return fetchApiClient<Array<WorkoutPlanWithWorkouts>>('/workout-plans')
}

export const getWorkoutPlansQueryOptions = () =>
  queryOptions({
    queryKey: ['getWorkoutPlans'],
    queryFn: getWorkoutPlans
  })
