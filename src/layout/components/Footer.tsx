import type { Component } from 'solid-js'
import { Link } from '~/components/Link'
import { ExternalLink, ownerEmail } from '~/config/app'
import { SocialIcons } from './SocialIcons'

export const Footer: Component = () => (
  <footer class="layout-container">
    <div class="layout-section">
      <div class="border-background bg-background flex flex-wrap items-center justify-center gap-3 rounded-3xl border p-6 text-center shadow-lg">
        <SocialIcons />
        <Link href={ExternalLink.email}>
          <p class="font-secondary text-right text-sm text-white/50 transition-colors duration-150 hover:text-white/75 max-sm:text-left">
            {ownerEmail}
          </p>
        </Link>
      </div>
    </div>
  </footer>
)
