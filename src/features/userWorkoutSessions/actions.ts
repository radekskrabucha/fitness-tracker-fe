import { queryOptions } from '@tanstack/solid-query'
import { fetchApiClient } from '~/lib/fetch'
import type {
  GetUserLatestWorkoutSessionResponse,
  GetUserWorkoutSessionsResponse,
  GetUserWorkoutSessionResponse
} from './types/response'

export const getUserWorkoutSessions = () =>
  fetchApiClient<GetUserWorkoutSessionsResponse>('/user/workout-sessions')
export const getUserWorkoutSessionsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['getUserWorkoutSessions', userId],
    queryFn: () => getUserWorkoutSessions(),
    deferStream: true
  })

export const getUserWorkoutSession = (id: string) =>
  fetchApiClient<GetUserWorkoutSessionResponse>(`/user/workout-sessions/${id}`)
export const getUserWorkoutSessionQueryOptions = (id: string, userId: string) =>
  queryOptions({
    queryKey: ['getUserWorkoutSession', id, userId],
    queryFn: () => getUserWorkoutSession(id),
    deferStream: true
  })

export const getUserLatestWorkoutSession = () =>
  fetchApiClient<GetUserLatestWorkoutSessionResponse>(
    '/user/workout-sessions/latest'
  )
export const getUserLatestWorkoutSessionQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['getUserLatestWorkoutSession', userId],
    queryFn: () => getUserLatestWorkoutSession(),
    deferStream: true
  })
