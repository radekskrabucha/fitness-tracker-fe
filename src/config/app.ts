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
  workoutPlans: '/workout-plans'
} as const

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
