import { ClientOnly } from '~/components/ClientOnly'
import { ChangePassword } from './components/ChangePassword'

export const ChangePasswordPage = () => (
  <ClientOnly>
    <ChangePassword />
  </ClientOnly>
)
