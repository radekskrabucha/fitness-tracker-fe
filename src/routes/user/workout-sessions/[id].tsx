import { SEOTitle } from '~/components/Seo'
import { UserWorkoutSessionPage } from '~/features/userWorkoutSessions/UserWorkoutSessionPage'

const UserWorkoutSession = () => (
  <>
    <SEOTitle title="Your Workout Session" />
    <UserWorkoutSessionPage />
  </>
)

export default UserWorkoutSession
