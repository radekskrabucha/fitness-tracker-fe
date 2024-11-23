import type { Component, JSXElement } from 'solid-js'
import { Card, cardVariants } from '~/components/Card'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import type { User } from '~/models/user'
import { EditUserMenu } from './EditUserMenu'

type UserSectionProps = {
  user: User
}

export const UserSection: Component<UserSectionProps> = props => (
  <section class="layout-section gap-6">
    <div class="grid grid-cols-4 grid-rows-3 gap-6 max-md:grid-cols-3 max-md:grid-rows-2">
      <Card class="col-span-3 row-span-3 justify-between gap-10 p-8">
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-2">
            <h2 class="line-clamp-2 text-3xl font-bold text-current/80">
              Hello, {props.user.name}!
            </h2>
            <EditUserMenu />
          </div>
          <p class="text text-lg">Below you can see your profile details.</p>
        </div>
        <div class="flex flex-col gap-6">
          <UserInfoTile
            label="E-mail"
            value={props.user.email}
            icon={
              <Icon
                icon="at"
                class="size-5"
              />
            }
          />
          <UserInfoTile
            label="Name"
            value={props.user.name}
            icon={
              <Icon
                icon="profile"
                class="size-5"
              />
            }
          />
        </div>
      </Card>
      <div class="flex flex-1 flex-col gap-6 max-md:col-span-3 max-md:flex-row max-md:flex-wrap md:row-span-3">
        <Link
          href={InternalLink.userWorkoutPlans}
          class={cardVariants({
            class:
              'flex-1 items-center justify-center gap-3 !p-4 text-center aria-[disabled=true]:cursor-not-allowed'
          })}
        >
          <h3 class="text-lg font-bold break-keep text-current/80">
            My workouts
          </h3>
        </Link>
        <Link
          href={InternalLink.workoutPlans}
          class={cardVariants({
            class:
              'flex-1 items-center justify-center gap-3 !p-4 text-center aria-[disabled=true]:cursor-not-allowed'
          })}
        >
          <h3 class="text-lg font-bold break-keep text-current/80">
            Explore workouts
          </h3>
        </Link>
        <Link
          href=""
          disabled
          class={cardVariants({
            class:
              'flex-1 items-center justify-center gap-3 !p-4 text-center aria-[disabled=true]:cursor-not-allowed'
          })}
        >
          <h3 class="text-lg font-bold break-keep text-current/80">
            Coming soon
          </h3>
        </Link>
      </div>
    </div>
  </section>
)

type UserInfoTileProps = {
  label: string
  value: string
  icon: JSXElement
}

const UserInfoTile: Component<UserInfoTileProps> = props => (
  <div class="flex flex-1 shrink-0 flex-wrap items-center gap-x-4 rounded-2xl bg-white px-6 py-3 shadow-sm">
    <div class="flex flex-wrap items-center gap-x-3">
      {props.icon}
      <h3 class="text-lg font-bold text-current/80 capitalize">
        {props.label}
      </h3>
    </div>
    <p class="line-clamp-1 text-lg text-current/50">{props.value}</p>
  </div>
)
