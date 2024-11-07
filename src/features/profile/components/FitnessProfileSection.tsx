import { createQuery } from '@tanstack/solid-query'
import { Show, type Component } from 'solid-js'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getUserFitnessProfileQueryOptions } from '../actions'
import {
  getActivityLevelName,
  getDietaryPreferenceName,
  getFitnessGoalName,
  getGenderName
} from '../utils'

type FitnessProfileSectionProps = {
  userId: string
}

export const FitnessProfileSection: Component<
  FitnessProfileSectionProps
> = props => {
  const getUserFitnessProfileQuery = createQuery(() =>
    getUserFitnessProfileQueryOptions(props.userId)
  )

  return (
    <section class="layout-section gap-6">
      <div class="inline-flex items-center gap-2">
        <h2 class="text-2xl font-bold">Fitness Profile</h2>
        <Link
          href={InternalLink.editFitnessProfile}
          class="flex size-7 shrink-0 items-center justify-center rounded-full hover:text-black/50"
        >
          <Icon
            id="copy"
            class="h-4 w-4 fill-current transition-colors duration-150"
          />
        </Link>
      </div>
      <QueryBoundary query={getUserFitnessProfileQuery}>
        {profile => (
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-bold">Age</h3>
              <p class="text-lg">{profile.age}</p>
            </div>

            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-bold">Height</h3>
              <p class="text-lg">{profile.height}</p>
            </div>

            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-bold">Weight</h3>
              <p class="text-lg">{profile.weight}</p>
            </div>

            <Show when={getGenderName(profile.gender)}>
              {genderName => (
                <div class="flex flex-col gap-2">
                  <h3 class="text-lg font-bold">Gender</h3>
                  <p class="text-lg">{genderName()}</p>
                </div>
              )}
            </Show>

            <Show when={getActivityLevelName(profile.activityLevel)}>
              {activityLevel => (
                <div class="flex flex-col gap-2">
                  <h3 class="text-lg font-bold">Activity Level</h3>
                  <p class="text-lg">{activityLevel()}</p>
                </div>
              )}
            </Show>

            <Show when={getFitnessGoalName(profile.fitnessGoal)}>
              {fitnessGoal => (
                <div class="flex flex-col gap-2">
                  <h3 class="text-lg font-bold">Fitness Goal</h3>
                  <p class="text-lg">{fitnessGoal()}</p>
                </div>
              )}
            </Show>

            <Show
              when={
                profile.dietaryPreference &&
                getDietaryPreferenceName(profile.dietaryPreference)
              }
            >
              {dietaryPreference => (
                <div class="flex flex-col gap-2">
                  <h3 class="text-lg font-bold">Dietary Preference</h3>
                  <p class="text-lg">{dietaryPreference()}</p>
                </div>
              )}
            </Show>
          </div>
        )}
      </QueryBoundary>
    </section>
  )
}
