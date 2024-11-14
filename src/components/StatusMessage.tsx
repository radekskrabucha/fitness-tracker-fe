import { type VariantProps, cva } from 'class-variance-authority'
import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js/types/server/index.js'

export type StatusMessageProps = VariantProps<typeof statusMessageVariants> &
  ComponentProps<'span'>

export const StatusMessage: Component<StatusMessageProps> = props => {
  const [localProps, others] = splitProps(props, [
    'class',
    'variant',
    'children'
  ])

  return (
    <span
      class={statusMessageVariants({
        variant: localProps.variant,
        class: localProps.class
      })}
      {...others}
    >
      {localProps.children}
    </span>
  )
}

export const statusMessageVariants = cva('text-sm', {
  variants: {
    variant: {
      info: 'text-black/50',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error'
    }
  },
  defaultVariants: {
    variant: 'info'
  }
})
