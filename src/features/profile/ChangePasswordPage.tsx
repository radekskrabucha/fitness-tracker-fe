import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { ChangePasswordForm } from './components/ChangePasswordForm'

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
