import { Popover } from '@kobalte/core/popover'
import { Button, buttonVariants } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'

export const EditUserMenu = () => (
  <Popover gutter={8}>
    <Popover.Trigger>
      <Button
        variant="outline"
        class="size-10 shrink-0 rounded-full border border-black/20 p-0 hover:border-black/10 hover:text-current/70"
      >
        <Icon
          id="menu-dots"
          class="size-5 fill-current transition-colors duration-150"
        />
      </Button>
    </Popover.Trigger>

    <Popover.Portal>
      <Popover.Content class="popover flex w-full origin-[var(--kb-hovercard-content-transform-origin)] flex-col gap-4 overflow-hidden rounded-lg border border-white px-6 py-4 text-black shadow-lg backdrop-blur-lg">
        <Link
          href={InternalLink.editProfile}
          class={buttonVariants({
            variant: 'link',
            class: 'justify-normal self-stretch'
          })}
        >
          <Icon
            id="edit"
            class="h-4 w-4 fill-current transition-colors duration-150"
          />
          Edit profile
        </Link>
        <Link
          href={InternalLink.changePassword}
          class={buttonVariants({
            variant: 'link',
            class: 'justify-normal self-stretch'
          })}
        >
          <Icon
            id="delete"
            class="h-4 w-4 fill-current transition-colors duration-150"
          />
          Change password
        </Link>
        <Link
          href={InternalLink.deleteProfile}
          class={buttonVariants({
            variant: 'link',
            class: 'text-error justify-normal self-stretch'
          })}
        >
          <Icon
            id="delete"
            class="h-4 w-4 fill-current transition-colors duration-150"
          />
          Delete profile
        </Link>
      </Popover.Content>
    </Popover.Portal>
  </Popover>
)
