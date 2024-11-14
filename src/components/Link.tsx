import { Link as KobalteLink } from '@kobalte/core/link'
import { A, type AnchorProps } from '@solidjs/router'
import { type Component, Show, type ComponentProps } from 'solid-js'
import { isExternalLink } from '~/utils/regexes'

type AElementProps = Pick<
  ComponentProps<'a'>,
  | 'class'
  | 'onClick'
  | 'onMouseEnter'
  | 'onTouchStart'
  | 'children'
  | 'id'
  | 'aria-label'
  | 'href'
  | 'ref'
  | 'target'
  | 'rel'
>
type CommonProps = {
  disabled: boolean | undefined
}
type ExternalLinkProps = AElementProps & CommonProps

type InternalLinkProps = {
  href: string
} & CommonProps &
  Omit<AElementProps, 'target' | 'rel' | 'href'> &
  Pick<
    AnchorProps,
    'replace' | 'noScroll' | 'state' | 'end' | 'activeClass' | 'inactiveClass'
  >

type LinkProps = ExternalLinkProps | InternalLinkProps

export const Link: Component<LinkProps> = props => (
  <Show
    when={(props.href && isExternalLink(props.href)) || props.disabled}
    fallback={<A {...(props as InternalLinkProps)} />}
  >
    <KobalteLink
      target="_blank"
      rel="noopener noreferrer"
      {...(props as ExternalLinkProps)}
    />
  </Show>
)
