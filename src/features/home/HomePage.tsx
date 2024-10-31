import type { Component } from 'solid-js'
import { AppName } from '~/config/app'

export const HomePage: Component = () => (
  <>
    <section class="layout-section flex-1 items-center justify-center gap-2 text-center">
      <h1 class="mb-4 text-4xl font-bold">{AppName}</h1>
    </section>
  </>
)
