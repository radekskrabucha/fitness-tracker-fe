import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { DeleteUser } from './components/DeleteUser'
import { SessionWrapper } from './components/SessionWrapper'

export const DeleteProfilePage = () => (
  <ClientOnly>
    <SessionWrapper>
      {user => (
        <ModalPage
          href={InternalLink.profile}
          title="Delete your profile"
          description="Are you sure you want to delete your account? This action is irreversible."
        >
          <DeleteUser userId={user.id} />
        </ModalPage>
      )}
    </SessionWrapper>
  </ClientOnly>
)
