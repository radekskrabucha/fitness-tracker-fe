import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'

export const EditUserPage = () => (
  <ClientOnly>
    <ModalPage
      href={InternalLink.profile}
      title="Edit your profile"
    >
      Edit user
    </ModalPage>
  </ClientOnly>
)
