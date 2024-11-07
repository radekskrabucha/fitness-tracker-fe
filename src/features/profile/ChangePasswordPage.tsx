import { ClientOnly } from '~/components/ClientOnly'
import { InternalLink } from '~/config/app'
import { ChangePasswordForm } from './components/ChangePasswordForm'
import { ModalPage } from '~/components/ModalPage'

export const ChangePasswordPage = () => (
  <ClientOnly>
    <ModalPage
      href={InternalLink.profile}
      title="Change Password"
    >
      <ChangePasswordForm />
    </ModalPage>
  </ClientOnly>
)
