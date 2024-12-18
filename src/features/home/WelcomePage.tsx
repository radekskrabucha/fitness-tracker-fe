import { Card } from '~/components/Card'
import { AppName } from '~/config/app'

export const WelcomePage = () => (
  <section class="layout-section flex-1 justify-center gap-2 text-center">
    <Card>
      <h1 class="mb-4 text-4xl font-bold">{AppName}</h1>
    </Card>
  </section>
)
