import { createQuery } from '@tanstack/solid-query'
import type { Component } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
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
            dietaryPreference: profile.dietaryPreference,
            fitnessGoal: profile.fitnessGoal,
            gender: profile.gender,
            height: profile.height,
            weight: profile.weight,
            age: profile.age
          }}
          userId={props.userId}
        />
      )}
    </QueryBoundary>
  )
}
