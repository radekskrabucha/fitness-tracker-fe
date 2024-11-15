import type { Component } from 'solid-js'
import { Button, buttonVariants } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { PopoverContent, Popover } from '~/components/Popover'
import { InternalLink } from '~/config/app'

type EditFitnessProfileMenuProps = {
  disabled?: boolean
}

export const EditFitnessProfileMenu: Component<
  EditFitnessProfileMenuProps
> = props => (
  <Popover gutter={8}>
    <Popover.Trigger>
      <Button
        variant="outline"
        class="size-10 shrink-0 rounded-full border border-black/20 bg-white p-0 shadow-md hover:border-black/10 hover:text-black/70"
        disabled={props.disabled}
      >
        <Icon
          icon="menu-dots"
          class="size-5 fill-current transition-colors duration-150"
        />
      </Button>
    </Popover.Trigger>

    <Popover.Portal>
      <PopoverContent>
        <Link
          href={InternalLink.editFitnessProfile}
          class={buttonVariants({
            variant: 'link',
            class: 'justify-normal self-stretch'
          })}
        >
          <Icon
            icon="edit"
            class="h-4 w-4 fill-current transition-colors duration-150"
          />
          Edit profile
        </Link>
        <Link
          href={InternalLink.deleteFitnessProfile}
          class={buttonVariants({
            variant: 'link',
            class: 'text-error justify-normal self-stretch'
          })}
        >
          <Icon
            icon="delete"
            class="h-4 w-4 fill-current transition-colors duration-150"
          />
          Delete fitness profile
        </Link>
      </PopoverContent>
    </Popover.Portal>
  </Popover>
)
