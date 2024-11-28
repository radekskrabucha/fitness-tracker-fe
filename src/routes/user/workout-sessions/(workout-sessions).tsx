import { SEOTitle } from '~/components/Seo'
import { UserWorkoutSessionsPage } from '~/features/userWorkoutSessions/UserWorkoutSessionsPage'

const UserWorkoutSessions = () => (
  <>
    <SEOTitle title="Your Workout Sessions" />
    <UserWorkoutSessionsPage />
  </>
)

export default UserWorkoutSessions
