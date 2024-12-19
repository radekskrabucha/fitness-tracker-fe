export const InternalLink = {
  home: '/',
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
  addWorkoutSession: (id: string) => `/user/workout/${id}/add-session`,
  userWorkoutSessions: '/user/workout-sessions',
  userWorkoutSession: (id: string) => `/user/workout-sessions/${id}`
} as const

export const RESTRICTED_ROUTES = [
  InternalLink.profile,
  InternalLink.editProfile,
  InternalLink.changePassword,
  InternalLink.createFitnessProfile,
  InternalLink.editFitnessProfile,
  InternalLink.deleteProfile,
  InternalLink.deleteFitnessProfile
]
export const AUTH_RESTRICTED_ROUTES = [InternalLink.signIn, InternalLink.signUp]

export const ownerEmail = 'rskrabucha13@gmail.com'

export const ExternalLink = {
  github: 'https://github.com/radekskrabucha',
  email: `mailto:${ownerEmail}`,
  sourceCode: 'https://github.com/radekskrabucha/fitness-tracker-fe'
} as const

export const AppName = 'Fitness Tracker'

export const defaultSeoTags = {
  description: 'Fitness Tracker app to track your workouts',
  siteUrl: import.meta.env.VITE_APP_BASE_URL
}
