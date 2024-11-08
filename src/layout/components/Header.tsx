import type { Component } from 'solid-js'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import { HeaderMenu } from './HeaderMenu'

export const Header: Component = () => (
  <header class="layout-container sticky top-0 isolate z-30">
    <div class="layout-section">
      <nav class="border-background bg-background/80 flex items-center gap-4 rounded-3xl border p-6 shadow-lg backdrop-blur-lg">
        <Link
          class="z-10 text-4xl"
          href={InternalLink.home}
        >
          🏋️‍♀️
        </Link>
        <HeaderMenu />
      </nav>
    </div>
  </header>
)
