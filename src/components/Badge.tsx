import { cva, type VariantProps } from 'class-variance-authority'
import { splitProps, type Component, type ComponentProps } from 'solid-js'
import { cn } from '~/utils/styles'

type BadgeProps = ComponentProps<'div'> & VariantProps<typeof badgeVariants>

export const Badge: Component<BadgeProps> = props => {
  const [local, others] = splitProps(props, ['class', 'variant'])

  return (
    <div
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      {...others}
    />
  )
}

export const badgeVariants = cva(
  'line-clamp-1 inline-flex w-min shrink-0 items-center rounded-md border px-3 py-1 text-xs font-semibold shadow-md transition-colors',
  {
    variants: {
      variant: {
        white: 'border-white/10 bg-white text-black hover:bg-white/80',
        black: 'border-black/10 bg-black text-white hover:bg-black/80',
        info: 'border-warning/10 bg-warning hover:bg-warning/90 text-white',
        danger: 'border-error/10 bg-error hover:bg-error/90 text-white',
        outline: 'border-current bg-transparent text-black shadow-none'
      }
    },
    defaultVariants: {
      variant: 'white'
    }
  }
)
