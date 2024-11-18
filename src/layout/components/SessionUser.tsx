import { useLocation, useNavigate } from '@solidjs/router'
import { createMutation, createQuery } from '@tanstack/solid-query'
import { Show } from 'solid-js'
import { Button, buttonVariants } from '~/components/Button'
import { Image } from '~/components/Image'
import { Link } from '~/components/Link'
import { LoaderCircle } from '~/components/LoaderCircle'
import { PopoverContent, Popover } from '~/components/Popover'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import { authClient } from '~/lib/auth'
import { nonNullable } from '~/utils/common'
import { isRestrictedRoute } from '~/utils/url'

export const SessionUser = () => {
  const getSessionQuery = createQuery(getSessionQueryOptions)
  const location = useLocation()
  const navigate = useNavigate()
  const logOutMutation = createMutation(() => ({
    mutationKey: ['signOut'],
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      const isProtectedRoute = isRestrictedRoute(location.pathname)

      if (isProtectedRoute) {
        navigate(InternalLink.home)
      }

      getSessionQuery.refetch()
    }
  }))

  return (
    <QueryBoundary
      query={getSessionQuery}
      loadingFallback={<AvatarPlaceholder />}
      errorFallback={() => (
        <Link
          href={InternalLink.signIn}
          class="font-secondary text-lg text-white/50 transition-colors duration-150 hover:text-white max-md:text-base"
          activeClass="text-primary"
        >
          <p>Sign In</p>
        </Link>
      )}
    >
      {({ user }) => (
        <>
          <Popover gutter={16}>
            <Popover.Trigger>
              <Image
                img={{
                  src: nonNullable(user.image) ? user.image : undefined,
                  alt: user.name,
                  class: 'flex-shrink-0 h-full w-full rounded-full object-cover'
                }}
                wrapper={{
                  fallbackDelay: 100,
                  class:
                    'flex-shrink-0 flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-white/50 p-0.5'
                }}
                fallback={{
                  class:
                    'rounded-full bg-white/10 flex-1 flex-shrink-0 h-full w-full flex items-center justify-center uppercase text-center text-white text-xl font-bold select-none',
                  children: user.name[0]
                }}
              />
            </Popover.Trigger>
            <Popover.Portal>
              <PopoverContent class="z-30">
                <Popover.Description class="font-secondary text-current/75">
                  {user.name}
                </Popover.Description>
                <Link
                  class={buttonVariants({ variant: 'link' })}
                  href={InternalLink.profile}
                >
                  See profile details
                </Link>
                <Button
                  onClick={() => logOutMutation.mutate()}
                  disabled={logOutMutation.isPending}
                  class="self-stretch"
                >
                  <Show when={logOutMutation.isPending}>
                    <LoaderCircle />
                  </Show>
                  Log out
                </Button>
              </PopoverContent>
            </Popover.Portal>
          </Popover>
        </>
      )}
    </QueryBoundary>
  )
}

export const AvatarPlaceholder = () => (
  <Image
    img={{
      src: undefined
    }}
    wrapper={{
      class:
        'p-1 size-10 flex items-center flex-shrink-0 justify-center rounded-full border-2 border-white/50 bg-white/5 animate-pulse'
    }}
  />
)
