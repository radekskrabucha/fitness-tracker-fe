import { createMutation, createQuery } from '@tanstack/solid-query'
import { Show } from 'solid-js'
import { Image } from '~/components/Image'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { authClient } from '~/lib/auth'
import { getSessionQueryOptions } from '../actions'

export const SessionUser = () => {
  const getSessionQuery = createQuery(getSessionQueryOptions)
  const logOutMutation = createMutation(() => ({
    mutationKey: ['signOut'],
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      getSessionQuery.refetch()
    }
  }))

  return (
    <QueryBoundary
      query={getSessionQuery}
      loadingFallback={
        <Image
          img={{
            src: undefined
          }}
          wrapper={{
            class:
              'p-1 size-10 flex items-center flex-shrink-0 justify-center rounded-full border-2 border-white/50'
          }}
        />
      }
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
      {data => (
        <>
          {/* TODO when types fixed update it  */}
          {/* @ts-expect-error types are wrong */}
          <Show when={data?.user}>
            {user => (
              <Image
                img={{
                  src: user().image,
                  alt: user().name,
                  class: 'rounded-full flex-shrink-0 object-cover'
                }}
                wrapper={{
                  // fallbackDelay: 500,
                  class:
                    'size-10 flex items-center  flex-shrink-0 justify-center rounded-full p-1 border-2 border-white/50 cursor-pointer',
                  onClick: () => logOutMutation.mutate()
                }}
                fallback={{
                  class:
                    'rounded-full bg-white/10 flex-1 flex-shrink-0 h-full w-full flex items-center justify-center uppercase text-center text-white text-xl font-bold select-none',
                  children: user().name.slice(0, 1)
                }}
              />
            )}
          </Show>
        </>
      )}
    </QueryBoundary>
  )
}
