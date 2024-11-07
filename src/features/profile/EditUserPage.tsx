import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { EditUserForm } from './components/EditUserForm'
import { SessionWrapper } from './components/SessionWrapper'

export const EditUserPage = () => (
  <ClientOnly>
    <ModalPage
      href={InternalLink.profile}
      title="Edit your profile"
    >
      <SessionWrapper>
        {user => <EditUserForm initialValues={{ name: user.name }} />}
      </SessionWrapper>
    </ModalPage>
  </ClientOnly>
)
