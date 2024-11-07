import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import { ChangePasswordForm } from './ChangePasswordForm'

export const ChangePassword = () => (
  <>
    <Link
      href={InternalLink.profile}
      class="show bg-background/10 fixed inset-0 backdrop-blur-sm"
    />
    <div class="show fixed top-[50%] left-[50%] flex h-[min(80vh,var(--width-lg))] w-[min(calc(100vw-48px),var(--width-3xl))] translate-x-[-50%] translate-y-[-50%] flex-col gap-6 rounded-3xl bg-white px-6 py-10">
      <div class="flex items-center justify-between gap-2">
        <h1 class="line-clamp-2 text-3xl font-bold">Change Password</h1>
        <Link
          href={InternalLink.profile}
          class="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/75 hover:text-current/50"
        >
          <Icon
            id="close"
            class="size-4 fill-current transition-colors duration-150"
          />
        </Link>
      </div>
      <ChangePasswordForm />
    </div>
  </>
)
