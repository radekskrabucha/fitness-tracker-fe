import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { EditUserFormWrapper } from './components/EditUserFormWrapper'

export const EditUserPage = () => (
  <ClientOnly>
    <ModalPage
      href={InternalLink.profile}
      title="Edit your profile"
    >
      <EditUserFormWrapper />
    </ModalPage>
  </ClientOnly>
)
