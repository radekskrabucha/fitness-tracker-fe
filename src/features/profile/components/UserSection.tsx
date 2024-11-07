import { Separator } from '@kobalte/core/separator'
import type { Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import type { User } from '~/models/user'

type UserSectionProps = {
  user: User
}

export const UserSection: Component<UserSectionProps> = props => (
  <section class="layout-section gap-6">
    <div class="flex flex-col gap-2">
      <h2 class="text-3xl font-bold">Hello, {props.user.name}!</h2>
      <p class="text text-lg">Below you can see your profile details.</p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-bold">E-mail</h3>
        <p class="text-lg">{props.user.email}</p>
      </div>
      <div class="flex flex-col gap-2">
        <div class="inline-flex items-center gap-2">
          <h3 class="text-lg font-bold">Name</h3>
          <Link
            href={InternalLink.editProfile}
            class="flex size-7 shrink-0 items-center justify-center rounded-full hover:text-black/50"
          >
            <Icon
              id="edit"
              class="h-4 w-4 fill-current transition-colors duration-150"
            />
          </Link>
        </div>
        <p class="text-lg">{props.user.name}</p>
      </div>
    </div>
    <Link
      href={InternalLink.changePassword}
      class={buttonVariants({ variant: 'link', class: 'self-start' })}
    >
      Change password
    </Link>
    <Separator class="border-t-black/10" />
  </section>
)
