import { Button, buttonVariants } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { PopoverContent, Popover } from '~/components/Popover'
import { InternalLink } from '~/config/app'

export const EditUserMenu = () => (
  <Popover gutter={8}>
    <Popover.Trigger>
      <Button
        variant="outline"
        class="size-10 shrink-0 rounded-full border border-black/20 bg-white p-0 shadow-md hover:border-black/10 hover:text-black/70"
      >
        <Icon
          id="menu-dots"
          class="size-5 fill-current transition-colors duration-150"
        />
      </Button>
    </Popover.Trigger>

    <Popover.Portal>
      <PopoverContent>
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
            id="password"
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
      </PopoverContent>
    </Popover.Portal>
  </Popover>
)
