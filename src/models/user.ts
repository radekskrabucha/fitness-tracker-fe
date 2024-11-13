export type User = {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | undefined
  banned: boolean | undefined
  role?: string | undefined
  banReason?: string | undefined
  banExpires?: undefined
}
