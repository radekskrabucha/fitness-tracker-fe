import type { IconId } from '~/components/Icon'

export const getIconHref = (id: IconId, timestamp: number) =>
  `/icon-sprite-${timestamp}.svg#${id}`
