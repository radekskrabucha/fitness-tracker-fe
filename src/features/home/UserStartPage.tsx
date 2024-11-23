import type { Component } from 'solid-js'
import { Header } from '~/components/Header'
import type { User } from '~/models/user'

type UserStartPageProps = User

export const UserStartPage: Component<UserStartPageProps> = props => (
  <>
    <section class="layout-section">
      <Header title={`Welcome back ${props.name}!`} />
    </section>
  </>
)
