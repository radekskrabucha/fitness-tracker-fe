import { Popover } from '@kobalte/core/popover'
import { splitProps, type ComponentProps, type FlowComponent } from 'solid-js'
import type { WithClass } from '~/types/common'
import { cn } from '~/utils/styles'
import { cardVariants } from './Card'

type ContentProps = Pick<
  ComponentProps<typeof Popover.Content>,
  | 'onOpenAutoFocus'
  | 'onCloseAutoFocus'
  | 'onEscapeKeyDown'
  | 'onPointerDownOutside'
  | 'onFocusOutside'
  | 'onInteractOutside'
  | 'id'
  | 'style'
  | 'as'
>

type PopoverProps = WithClass<ContentProps>

export const PopoverContent: FlowComponent<PopoverProps> = props => {
  const [localProps, others] = splitProps(props, ['class'])

  return (
    <Popover.Content
      class={cn(
        cardVariants(),
        'popover-animation z-10 min-w-52 origin-[var(--kb-hovercard-content-transform-origin)] items-center gap-4 overflow-hidden rounded-lg px-6 py-4',
        localProps.class
      )}
      {...others}
    />
  )
}

export { Popover }
