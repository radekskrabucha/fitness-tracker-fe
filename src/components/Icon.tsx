import type { Component, ComponentProps } from 'solid-js'
import type { IconId } from '~/types/icons'
import { getIconHref } from '~/utils/icons'

type IconProps = {
  id: IconId
} & ComponentProps<'svg'>

export const Icon: Component<IconProps> = props => (
  <svg {...props}>
    <use href={getIconHref(props.id)} />
  </svg>
)
