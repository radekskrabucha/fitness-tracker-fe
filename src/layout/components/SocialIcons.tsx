import type { Component } from 'solid-js'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { ExternalLink } from '~/config/app'

export const SocialIcons: Component = () => (
  <div class="flex items-center gap-3 text-white">
    <Link
      href={ExternalLink.github}
      aria-label="Github"
    >
      <Icon
        icon="github"
        class="h-6 w-6 fill-current transition-colors duration-150 hover:text-white/50"
      />
    </Link>
    <Link
      href={ExternalLink.sourceCode}
      aria-label="Source Code"
    >
      <Icon
        icon="source-code"
        class="h-6 w-6 fill-current transition-colors duration-150 hover:text-white/50"
      />
    </Link>
  </div>
)
