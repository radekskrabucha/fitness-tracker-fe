import {
  Skeleton as KobalteSkeleton,
  type SkeletonRootProps
} from '@kobalte/core/skeleton'
import { splitProps, type ParentComponent } from 'solid-js'
import type { WithClass } from '~/types/common'
import { cn } from '~/utils/styles'

export const Skeleton: ParentComponent<WithClass<SkeletonRootProps>> = props => {
  const [localProps, others] = splitProps(props, ['class'])

  return (
    <KobalteSkeleton
      class={cn(
        'flex-1 rounded-lg bg-black/5 data-[animate=true]:animate-pulse data-[visible=false]:bg-transparent',
        localProps.class
      )}
      {...others}
    />
  )
}
