import type { FlowComponent } from 'solid-js'
import { ClientOnly } from '~/components/ClientOnly'
import { FitnessProfileSection } from './components/FitnessProfileSection'
import { SessionWrapper } from './components/SessionWrapper'
import { UserSection } from './components/UserSection'

export const ProfilePage: FlowComponent = props => (
  <>
    <ClientOnly>
      <SessionWrapper>
        {user => (
          <>
            <UserSection user={user} />
            <FitnessProfileSection userId={user.id} />
          </>
        )}
      </SessionWrapper>
    </ClientOnly>
    {props.children}
  </>
)
