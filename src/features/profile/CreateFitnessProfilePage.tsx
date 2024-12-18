import { Card } from '~/components/Card'
import { CreateFitnessProfileForm } from './components/CreateFitnessProfileForm'

export const CreateFitnessProfilePage = () => (
  <section class="layout-section flex-1 justify-center">
    <Card class="items-center gap-6 text-center">
      <h2 class="mb-4 text-4xl font-bold">Create Fitness Profile</h2>
      <CreateFitnessProfileForm />
    </Card>
  </section>
)
