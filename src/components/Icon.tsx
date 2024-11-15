import { Link } from '@solidjs/meta'
import { splitProps, type Component, type ComponentProps } from 'solid-js'
import { getIconHref } from '~/utils/icons'

type IconProps = {
  icon: IconId
} & ComponentProps<'svg'>

export const Icon: Component<IconProps> = props => {
  const [localProps, others] = splitProps(props, ['icon'])

  return (
    <svg {...others}>
      <use href={getIconHref(localProps.icon, timestamp)} />
    </svg>
  )
}

export const SpriteIconsLink = () => (
  <Link
    rel="preload"
    as="image"
    href={`/icon-sprite-${timestamp}.svg`}
  />
)


export const timestamp = 1731687054

export type IconId =
  | 'arrow'
  | 'at'
  | 'calendar'
  | 'chevron'
  | 'close'
  | 'delete'
  | 'diet'
  | 'edit'
  | 'gender'
  | 'github'
  | 'gym'
  | 'height'
  | 'menu-dots'
  | 'password'
  | 'profile'
  | 'source-code'
  | 'target'
  | 'twitter'
  | 'weight'
