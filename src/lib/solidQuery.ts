import { QueryClient } from '@tanstack/solid-query'

const FIVE_MINUTES = 1000 * 60 * 5
export const QUERY_STALE_TIME = FIVE_MINUTES
export const QUERY_CACHE_TIME = QUERY_STALE_TIME + FIVE_MINUTES

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_CACHE_TIME,
      retry: false,
      throwOnError: true,
      refetchOnWindowFocus: false,
      experimental_prefetchInRender: true,
      suspense: true
    },
    mutations: {
      gcTime: QUERY_CACHE_TIME
    }
  }
})
