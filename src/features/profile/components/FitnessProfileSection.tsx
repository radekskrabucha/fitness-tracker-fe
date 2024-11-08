import { createQuery } from '@tanstack/solid-query'
import { Show, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
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
import { EditFitnessProfileMenu } from './EditFitnessProfileMenu'
import { FitnessTile } from './FitnessTile'

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
    <section class="layout-section">
      <div class="card flex flex-col gap-10 p-8">
        <div class="flex items-center justify-between gap-2">
          <h2 class="line-clamp-2 text-3xl font-bold text-black/80">
            Fitness profile
          </h2>
          <EditFitnessProfileMenu />
        </div>
        <QueryBoundary
          query={getUserFitnessProfileQuery}
          errorFallback={() => <NotFoundProfile />}
          notFoundFallback={<NotFoundProfile />}
        >
          {profile => (
            <div class="flex flex-row flex-wrap gap-10">
              <FitnessTile
                label="Height"
                value={profile.height}
                icon={
                  <Icon
                    id="height"
                    class="size-5"
                  />
                }
                unit="cm"
              />

              <FitnessTile
                label="Weight"
                value={profile.weight}
                icon={
                  <Icon
                    id="weight"
                    class="size-5"
                  />
                }
                unit="kg"
              />

              <FitnessTile
                label="Age"
                value={profile.age}
                icon={
                  <Icon
                    id="calendar"
                    class="size-5"
                  />
                }
              />

              <Show when={getGenderName(profile.gender)}>
                {genderName => (
                  <FitnessTile
                    label="Gender"
                    value={genderName()}
                    icon={
                      <Icon
                        id="gender"
                        class="size-5"
                      />
                    }
                  />
                )}
              </Show>

              <Show when={getActivityLevelName(profile.activityLevel)}>
                {activityLevel => (
                  <FitnessTile
                    label="Activity Level"
                    value={activityLevel()}
                    icon={
                      <Icon
                        id="gym"
                        class="size-5"
                      />
                    }
                  />
                )}
              </Show>

              <Show when={getFitnessGoalName(profile.fitnessGoal)}>
                {fitnessGoal => (
                  <FitnessTile
                    label="Fitness Goal"
                    value={fitnessGoal()}
                    icon={
                      <Icon
                        id="target"
                        class="size-5"
                      />
                    }
                  />
                )}
              </Show>

              <Show
                when={
                  profile.dietaryPreference &&
                  getDietaryPreferenceName(profile.dietaryPreference)
                }
              >
                {dietaryPreference => (
                  <FitnessTile
                    label="Dietary Preference"
                    value={dietaryPreference()}
                    icon={
                      <Icon
                        id="diet"
                        class="size-5"
                      />
                    }
                  />
                )}
              </Show>
            </div>
          )}
        </QueryBoundary>
      </div>
    </section>
  )
}

const NotFoundProfile = () => (
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold text-black/80">
        You don't have a fitness profile yet.
      </h3>
      <p class="text-lg text-black/50">
        Create your fitness profile to start tracking your progress.
      </p>
    </div>
    <Link
      href={InternalLink.createFitnessProfile}
      class={buttonVariants({ variant: 'primary' })}
    >
      Create fitness profile
    </Link>
  </div>
)
