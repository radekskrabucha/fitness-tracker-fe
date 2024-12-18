import { createQuery } from '@tanstack/solid-query'
import type { Component } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { nonNullable } from '~/utils/common'
import { getInitialFormDate } from '~/utils/date'
import { getUserFitnessProfileQueryOptions } from '../actions'
import { EditFitnessProfileForm } from './EditFitnessProfileForm'

type EditFitnessProfileFormWrapperProps = {
  userId: string
}

export const EditFitnessProfileFormWrapper: Component<
  EditFitnessProfileFormWrapperProps
> = props => {
  const getUserFitnessProfileQuery = createQuery(() =>
    getUserFitnessProfileQueryOptions(props.userId)
  )

  return (
    <QueryBoundary query={getUserFitnessProfileQuery}>
      {profile => (
        <EditFitnessProfileForm
          initialValues={{
            activityLevel: profile.activityLevel,
            dietaryPreference: nonNullable(profile.dietaryPreference)
              ? profile.dietaryPreference
              : undefined,
            fitnessGoal: profile.fitnessGoal,
            gender: profile.gender,
            height: profile.height.toString(),
            weight: profile.weight.toString(),
            dateOfBirth: getInitialFormDate(profile.dateOfBirth)
          }}
          userId={props.userId}
        />
      )}
    </QueryBoundary>
  )
}
