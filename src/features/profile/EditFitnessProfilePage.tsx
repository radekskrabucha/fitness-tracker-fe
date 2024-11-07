import { ClientOnly } from '~/components/ClientOnly'
import { ModalPage } from '~/components/ModalPage'
import { InternalLink } from '~/config/app'
import { EditFitnessProfileFormWrapper } from './components/EditFitnessProfileFormWrapper'
import { EditFitnessProfileMenu } from './components/EditFitnessProfileMenu'
import { SessionWrapper } from './components/SessionWrapper'

export const EditFitnessProfilePage = () => (
  <ClientOnly>
    <SessionWrapper>
      {user => (
        <ModalPage
          href={InternalLink.profile}
          title="Edit your profile"
          icon={<EditFitnessProfileMenu userId={user.id} />}
        >
          <EditFitnessProfileFormWrapper userId={user.id} />
        </ModalPage>
      )}
    </SessionWrapper>
  </ClientOnly>
)
