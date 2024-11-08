import type { Component } from 'solid-js'
import { Link } from '~/components/Link'
import type { User } from '~/models/user'
import { EditUserMenu } from './EditUserMenu'

type UserSectionProps = {
  user: User
}

export const UserSection: Component<UserSectionProps> = props => (
  <section class="layout-section gap-6">
    <div class="grid grid-cols-4 grid-rows-3 gap-6 max-md:grid-cols-3 max-md:grid-rows-2">
      <div class="card col-span-3 row-span-3 flex flex-col justify-between gap-10 p-8">
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-2">
            <h2 class="line-clamp-2 text-3xl font-bold text-black/80">
              Hello, {props.user.name}!
            </h2>
            <EditUserMenu />
          </div>
          <p class="text text-lg">Below you can see your profile details.</p>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <h3 class="text-lg font-bold text-black/80">E-mail</h3>
            <p class="text-lg text-current/50">{props.user.email}</p>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-lg font-bold text-black/80">Name</h3>
            <p class="text-lg text-current/50">{props.user.name}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-6 max-md:col-span-3 max-md:flex-row max-md:flex-wrap md:row-span-3">
        <Link
          href=""
          disabled
          class="card flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center aria-[disabled=true]:cursor-not-allowed"
        >
          <h3 class="text-lg font-bold break-keep text-black/80">
            My workouts
          </h3>
        </Link>
        <Link
          href=""
          disabled
          class="card flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center aria-[disabled=true]:cursor-not-allowed"
        >
          <h3 class="text-lg font-bold break-keep text-black/80">
            Explore workouts
          </h3>
        </Link>
        <Link
          href=""
          disabled
          class="card flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center aria-[disabled=true]:cursor-not-allowed"
        >
          <h3 class="text-lg font-bold break-keep text-black/80">
            Coming soon
          </h3>
        </Link>
      </div>
    </div>
  </section>
)
