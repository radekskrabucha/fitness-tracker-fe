import { Separator } from '@kobalte/core/separator'
import { createQuery } from '@tanstack/solid-query'
import { buttonVariants } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { Skeleton } from '~/components/Skeleton'
import { InternalLink } from '~/config/app'
import { getSessionQueryOptions } from '~/features/signIn/actions'

export const UserSection = () => {
  const getSessionQuery = createQuery(getSessionQueryOptions)

  return (
    <section class="layout-section gap-6">
      <QueryBoundary
        query={getSessionQuery}
        loadingFallback={
          <div class="grid min-h-72 w-full flex-1 grid-cols-[1fr_2fr] gap-6">
            <Skeleton class="row-span-2" />
            <Skeleton />
            <Skeleton />
          </div>
        }
      >
        {({ user }) => (
          <>
            <div class="flex flex-col gap-2">
              <h2 class="text-3xl font-bold">Hello, {user.name}!</h2>
              <p class="text text-lg">
                Below you can see your profile details.
              </p>
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <h3 class="text-lg font-bold">E-mail</h3>
                <p class="text-lg">{user.email}</p>
              </div>
              <div class="flex flex-col gap-2">
                <div class="inline-flex items-center gap-2">
                  <h3 class="text-lg font-bold">Name</h3>
                  <Link href={InternalLink.editProfile}>
                    <Icon
                      id="copy"
                      class="h-4 w-4 fill-current transition-colors duration-150 hover:text-current/50"
                    />
                  </Link>
                </div>
                <p class="text-lg">{user.name}</p>
              </div>
            </div>
            <Link
              href={InternalLink.changePassword}
              class={buttonVariants({ variant: 'link', class: 'self-start' })}
            >
              Change password
            </Link>
            <Separator class="border-t-black/10" />
          </>
        )}
      </QueryBoundary>
    </section>
  )
}
