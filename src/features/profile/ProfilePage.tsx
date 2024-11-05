import type { FlowComponent } from 'solid-js'

export const ProfilePage: FlowComponent = props => (
  <>
    <section class="layout-section flex-1 items-center justify-center gap-2 text-center">
      <h1 class="mb-4 text-4xl font-bold">Profile</h1>
    </section>
    {props.children}
  </>
)
