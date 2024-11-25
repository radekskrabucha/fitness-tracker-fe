export type PaginationParams =
  | {
      page: number
      limit: number
    }
  | {
      limit: number
    }
  | undefined

export type RequestWithPagination<T = {}> = PaginationParams & T

export type PaginationMeta = {
  total: number
  limit: number
  offset: number
  page: number
}

export type ResponseWithPagination<T> = {
  data: T
  meta?: PaginationMeta
}
