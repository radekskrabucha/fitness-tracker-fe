import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { EditFitnessProfileFormWrapper } from './components/EditFitnessProfileFormWrapper'
import { SessionWrapper } from './components/SessionWrapper'

export const EditFitnessProfilePage = () => (
  <ClientOnly>
    <ModalPage
      href={InternalLink.profile}
      title="Edit your profile"
    >
      <SessionWrapper>
        {user => <EditFitnessProfileFormWrapper userId={user.id} />}
      </SessionWrapper>
    </ModalPage>
  </ClientOnly>
)
