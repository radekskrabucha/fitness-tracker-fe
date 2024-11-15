import { splitProps, type Component, type ComponentProps } from 'solid-js'
import type { IconId } from '~/types/icons'
import { getIconHref } from '~/utils/icons'

type IconProps = {
  icon: IconId
} & ComponentProps<'svg'>

export const Icon: Component<IconProps> = props => {
  const [localProps, others] = splitProps(props, ['icon'])

  return (
    <svg {...others}>
      <use href={getIconHref(localProps.icon)} />
    </svg>
  )
}
