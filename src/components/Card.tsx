import { cva, type VariantProps } from 'class-variance-authority'
import { splitProps, type ComponentProps, type FlowComponent } from 'solid-js'
import { cn } from '~/utils/styles'

type CardProps = VariantProps<typeof cardVariants> & ComponentProps<'div'>

export const Card: FlowComponent<CardProps> = props => {
  const [local, others] = splitProps(props, ['class', 'variant'])

  return (
    <div
      class={cn(cardVariants({ variant: local.variant }), local.class)}
      {...others}
    />
  )
}
export const cardVariants = cva(
  'flex flex-col rounded-3xl border p-8 shadow-lg backdrop-blur-2xl',
  {
    variants: {
      variant: {
        white: 'border-white/30 bg-white/30 text-black',
        black: 'border-black/30 bg-black/40 text-white'
      }
    },
    defaultVariants: {
      variant: 'white'
    }
  }
)
