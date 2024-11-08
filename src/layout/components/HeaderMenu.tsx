import { cx } from 'class-variance-authority'
import { type Component } from 'solid-js'
import { ClientOnly } from '~/components/ClientOnly'
import { useToggle } from '~/hooks/useToggle'
import { Hamburger } from './Hamburger'
import { NavLinks } from './NavLinks'
import { AvatarPlaceholder, SessionUser } from './SessionUser'

export const HeaderMenu: Component = () => {
  const { isOn, toggle, setOff } = useToggle()

  return (
    <div class="flex flex-1 items-center justify-end gap-6">
      <div
        class={cx(
          'max-md:bg-background flex flex-1 items-center justify-end gap-6 max-md:fixed max-md:top-0 max-md:left-[150%] max-md:isolate max-md:h-[calc(100dvh-var(--spacing-12))] max-md:w-full max-md:flex-col max-md:justify-center max-md:overflow-hidden max-md:rounded-3xl max-md:border max-md:transition-all max-md:duration-300 max-md:ease-in-out',
          isOn() ? 'max-md:-translate-x-[150%]' : 'max-md:translate-x-0'
        )}
      >
        <NavLinks onNavLinkClick={() => setOff()} />
      </div>
      <ClientOnly serverFallbackPlaceholder={<AvatarPlaceholder />}>
        <SessionUser />
      </ClientOnly>
      <Hamburger
        isOpen={isOn()}
        onToggle={() => toggle()}
      />
    </div>
  )
}
