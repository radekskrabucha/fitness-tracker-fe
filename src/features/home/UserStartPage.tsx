import type { Component } from 'solid-js'
import { Header } from '~/components/Header'
import type { User } from '~/models/user'
import { WorkoutPlansSection } from './components/WorkoutPlansSection'

type UserStartPageProps = User

export const UserStartPage: Component<UserStartPageProps> = props => (
  <>
    <section class="layout-section">
      <Header
        title={`Welcome back, ${props.name}!`}
        description="It's nice to see you again! Check the plan for today."
        variant="black"
      />
    </section>
    <WorkoutPlansSection userId={props.id} />
  </>
)
