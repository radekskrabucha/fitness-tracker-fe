import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type { GetUserTodayWorkoutsResponse } from './types/response'

export const getUserTodayWorkouts = () =>
  fetchApiClient<GetUserTodayWorkoutsResponse>('/user/workouts/today')

export const getUserWorkoutPlansQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['getUserTodayWorkouts', userId],
    queryFn: () => getUserTodayWorkouts(),
    deferStream: true
  })
