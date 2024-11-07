import type { FlowComponent } from 'solid-js'
import { ClientOnly } from '~/components/ClientOnly'
import { SessionWrapper } from './components/SessionWrapper'
import { UserSection } from './components/UserSection'

export const ProfilePage: FlowComponent = props => (
  <>
    <ClientOnly>
      <SessionWrapper>
        {user => (
          <>
            <UserSection user={user} />
          </>
        )}
      </SessionWrapper>
    </ClientOnly>
    {props.children}
  </>
)
