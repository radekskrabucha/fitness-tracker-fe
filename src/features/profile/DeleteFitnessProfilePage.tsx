import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { DeleteFitnessProfile } from './components/DeleteFitnessProfile'
import { SessionWrapper } from './components/SessionWrapper'

export const DeleteFitnessProfilePage = () => (
  <ClientOnly>
    <SessionWrapper>
      {user => (
        <ModalPage
          href={InternalLink.profile}
          title="Delete fitness profile"
        >
          <DeleteFitnessProfile userId={user.id} />
        </ModalPage>
      )}
    </SessionWrapper>
  </ClientOnly>
)
