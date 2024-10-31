import { ofetch, type FetchOptions } from 'ofetch'

const FETCH_DEFAULT_TIMEOUT = 20000
const FETCH_DEFAULT_CONFIG: FetchOptions = {
  timeout: FETCH_DEFAULT_TIMEOUT,
  retry: 0
}

export const fetchBaseClient = ofetch.create({
  ...FETCH_DEFAULT_CONFIG
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
