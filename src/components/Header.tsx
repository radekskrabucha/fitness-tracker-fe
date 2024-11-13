import { cva, type VariantProps } from 'class-variance-authority'
import { Show, type Component, type JSXElement } from 'solid-js'
import type { WithClass } from '~/types/common'
import { cn } from '~/utils/styles'

type HeaderSectionProps = WithClass<{
  title: JSXElement
  description?: JSXElement
  icon?: JSXElement
}> &
  VariantProps<typeof headerVariants>

export const Header: Component<HeaderSectionProps> = props => (
  <div
    class={cn(headerVariants({ variant: props.variant, class: props.class }))}
  >
    <div class="flex flex-col">
      <h2 class="text-3xl font-bold text-current/90">{props.title}</h2>
      <Show when={props.description}>
        {description => <p class="text-lg text-current/50">{description()}</p>}
      </Show>
    </div>
    <Show when={props.icon}>{icon => icon()}</Show>
  </div>
)

export const headerVariants = cva(
  'flex items-center justify-between gap-x-8 gap-y-4 rounded-3xl border px-8 py-4 shadow-lg backdrop-blur-2xl max-md:gap-6',
  {
    variants: {
      variant: {
        white: 'border-white/30 bg-white/40 text-black',
        black: 'border-black/30 bg-black/40 text-white'
      }
    },
    defaultVariants: {
      variant: 'white'
    }
  }
)
