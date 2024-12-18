import type { Component } from 'solid-js'
import { InternalLink } from '~/config/app'
import { NavLink } from './NavLink'

type NavLinksProps = {
  onNavLinkClick: VoidFunction
}

export const NavLinks: Component<NavLinksProps> = props => (
  <ul class="flex gap-x-6 gap-y-2 max-md:flex-col">
    <NavLink
      href={InternalLink.home}
      text="Home"
      onClick={props.onNavLinkClick}
    />
    <NavLink
      href={InternalLink.workoutPlans}
      text="Explore Plans"
      onClick={props.onNavLinkClick}
    />
  </ul>
)
