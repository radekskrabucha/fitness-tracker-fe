import type { FlowComponent } from 'solid-js'
import { ClientOnly } from '~/components/ClientOnly'
import { UserSection } from './components/UserSection'

export const ProfilePage: FlowComponent = props => (
  <>
    <ClientOnly>
      <UserSection />
    </ClientOnly>
    {props.children}
  </>
)
