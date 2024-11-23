export const InternalLink = {
  home: '/',
  start: '/start',
  signIn: '/sign-in',
  signUp: '/sign-up',
  profile: '/profile',
  editProfile: '/profile/edit',
  changePassword: '/profile/change-password',
  createFitnessProfile: '/create-profile',
  editFitnessProfile: '/profile/edit-fitness',
  deleteProfile: '/profile/delete',
  deleteFitnessProfile: '/profile/delete-fitness',
  workoutPlans: '/workout-plans',
  workoutPlan: (id: string) => `/workout-plans/${id}`,
  chooseWorkoutPlan: (id: string) => `/workout-plans/${id}/choose`,
  userWorkoutPlans: '/user/workout-plans',
  userWorkoutPlan: (id: string) => `/user/workout-plans/${id}`,
  addWorkoutSession: (id: string) => `/user/workout/${id}/add-session`
} as const

export const RESTRICTED_ROUTES = [
  InternalLink.start,
  InternalLink.profile,
  InternalLink.editProfile,
  InternalLink.changePassword,
  InternalLink.createFitnessProfile,
  InternalLink.editFitnessProfile,
  InternalLink.deleteProfile,
  InternalLink.deleteFitnessProfile
]
export const AUTH_RESTRICTED_ROUTES = [
  InternalLink.signIn,
  InternalLink.signUp,
  InternalLink.home
]

export const ownerEmail = 'rskrabucha13@gmail.com'

export const ExternalLink = {
  github: 'https://github.com/radekskrabucha',
  twitter: 'https://twitter.com/radek_1313',
  email: `mailto:${ownerEmail}`,
  sourceCode: 'https://github.com/radekskrabucha/fitness-tracker-fe'
} as const

export const AppName = 'Fitness Tracker'

export const defaultSeoTags = {
  description: 'Fitness Tracker app to track your workouts',
  siteUrl: import.meta.env.VITE_APP_BASE_URL
}
