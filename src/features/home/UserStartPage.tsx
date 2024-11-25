import type { Component } from 'solid-js'
import type { User } from '~/models/user'
import { TodayWorkoutsSection } from './components/TodayWorkoutsSection'
import { WorkoutPlansSection } from './components/WorkoutPlansSection'

type UserStartPageProps = Pick<User, 'id' | 'name'>

export const UserStartPage: Component<UserStartPageProps> = props => (
  <>
    <TodayWorkoutsSection
      userId={props.id}
      userName={props.name}
    />
    <WorkoutPlansSection userId={props.id} />
  </>
)
