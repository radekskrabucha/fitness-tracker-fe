import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { EditUserForm } from './components/EditUserForm'

export const EditUserPage = () => (
  <ClientOnly>
    <ModalPage
      href={InternalLink.profile}
      title="Edit your profile"
    >
      <EditUserForm />
    </ModalPage>
  </ClientOnly>
)
