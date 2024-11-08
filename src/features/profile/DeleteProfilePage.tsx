import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { DeleteUserForm } from './components/DeleteUserForm'
import { SessionWrapper } from './components/SessionWrapper'

export const DeleteProfilePage = () => (
  <ClientOnly>
    <SessionWrapper>
      {user => (
        <ModalPage
          href={InternalLink.profile}
          title="Delete your profile"
        >
          <DeleteUserForm userId={user.id} />
        </ModalPage>
      )}
    </SessionWrapper>
  </ClientOnly>
)
