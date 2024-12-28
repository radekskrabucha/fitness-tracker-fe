import { ofetch, type FetchOptions } from 'ofetch'

const FETCH_DEFAULT_TIMEOUT = 180_000 // 3 minutes
const FETCH_DEFAULT_CONFIG: FetchOptions = {
  timeout: FETCH_DEFAULT_TIMEOUT,
  retry: 0
}

export const fetchBaseClient = ofetch.create({
  ...FETCH_DEFAULT_CONFIG
})

export const fetchApiClient = ofetch.create({
  ...FETCH_DEFAULT_CONFIG,
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  mode: 'cors',
  credentials: 'include'
})

export const mockFetch = <TReq, TRes>({
  mockData,
  shouldReject = false,
  timeout = 1000,
  errorMessage
}: MockParams<TReq, TRes>): Promise<TRes> => {
  return new Promise<TRes>((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        return reject(new Error(errorMessage ?? 'Fetch mocked error message.'))
      }

      return resolve(mockData)
    }, timeout)
  })
}
export type MockParams<TReq, TRes> = {
  shouldReject?: boolean
  mockData: Awaited<TRes>
  timeout?: number
  errorMessage?: string
  req?: TReq
}
