import {
  Button as KobalteButton,
  type ButtonRootProps
} from '@kobalte/core/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { splitProps, type Component, type ComponentProps } from 'solid-js'
import { cn } from '~/utils/styles'

type ButtonElementProps = Pick<
  ComponentProps<'button'>,
  'class' | 'children' | 'onClick' | 'id'
>

type ButtonProps = ButtonElementProps &
  VariantProps<typeof buttonVariants> &
  ButtonRootProps

export const Button: Component<ButtonProps> = props => {
  const [localProps, others] = splitProps(props, [
    'variant',
    'class',
    'children',
    'type'
  ])

  return (
    <KobalteButton
      {...others}
      type={localProps.type || 'button'}
      class={cn(
        buttonVariants({
          variant: localProps.variant,
          class: localProps.class
        })
      )}
    >
      {localProps.children}
    </KobalteButton>
  )
}

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-1 rounded-md text-sm font-medium capitalize ring-offset-white transition-colors focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-black px-4 py-2 text-white disabled:bg-black/50',
        primaryDanger:
          'bg-error hover:bg-error/80 disabled:bg-error/50 px-4 py-2 text-white',
        outline:
          'border border-black px-4 py-2 text-black hover:border-black/60 hover:text-black/60 disabled:border-black/20 disabled:text-black/20',
        link: 'underline underline-offset-2 disabled:opacity-50'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)
