import { useNavigate } from '@solidjs/router'
import { createForm } from '@tanstack/solid-form'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import type { Component } from 'solid-js'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { NumberInputWithSteps } from '~/components/NumberInputWithSteps'
import { RadioGroup } from '~/components/RadioGroup'
import { toast } from '~/components/Toast'
import { DatePicker } from '~/components/datePicker/DatePicker'
import { InternalLink } from '~/config/app'
import {
  fitnessProfileActivityLevel,
  fitnessProfileDietaryPreference,
  fitnessProfileFitnessGoal,
  fitnessProfileGender
} from '~/models/profile'
import { nonNullable } from '~/utils/common'
import {
  editFitnessProfile,
  getUserFitnessProfileQueryOptions
} from '../actions'
import {
  maxDateOfBirthDate,
  maxHeight,
  maxWeight,
  minDateOfBirthDate,
  minHeight,
  minWeight
} from '../form/createFitnessProfileForm'
import {
  editFitnessProfileSchema,
  type Form
} from '../form/editFitnessProfileForm'
import {
  getActivityLevelName,
  getDietaryPreferenceName,
  getFitnessGoalName,
  getGenderName
} from '../utils'

type EditFitnessProfileFormProps = {
  initialValues: Form
  userId: string
}

export const EditFitnessProfileForm: Component<
  EditFitnessProfileFormProps
> = props => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const form = createForm(() => ({
    defaultValues: props.initialValues,

    onSubmit: ({ value }) =>
      editFitnessProfileMutation.mutate({
        height: nonNullable(value.height) ? Number(value.height) : undefined,
        dateOfBirth: nonNullable(value.dateOfBirth)
          ? new Date(value.dateOfBirth).toString()
          : undefined,
        weight: nonNullable(value.weight) ? Number(value.weight) : undefined,
        dietaryPreference: nonNullable(value.dietaryPreference)
          ? value.dietaryPreference
          : undefined,
        fitnessGoal: nonNullable(value.fitnessGoal)
          ? value.fitnessGoal
          : undefined,
        gender: nonNullable(value.gender) ? value.gender : undefined,
        activityLevel: nonNullable(value.activityLevel)
          ? value.activityLevel
          : undefined
      }),
    validators: {
      onSubmit: editFitnessProfileSchema
    }
  }))
  const editFitnessProfileMutation = createMutation(() => ({
    mutationFn: editFitnessProfile,
    mutationKey: ['editFitnessProfile'],
    onSuccess: async res => {
      queryClient.setQueryData(
        getUserFitnessProfileQueryOptions(props.userId).queryKey,
        () => res
      )
      form.reset()
      toast.show({
        title: 'Profile updated successfully!',
        description: 'Your fitness profile has been updated successfully.',
        variant: 'success',
        priority: 'high'
      })
      navigate(InternalLink.profile)
    },
    onError: () => {
      return toast.show({
        title: 'Oops! Something went wrong 🤓',
        description: 'Please try again later.',
        variant: 'error',
        priority: 'high'
      })
    }
  }))

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      class="my-auto flex w-full max-w-xl flex-col gap-8 self-center text-left"
    >
      <div class="flex flex-1 flex-wrap gap-6">
        <form.Field name="height">
          {field => (
            <NumberInputWithSteps
              label="Your height"
              description="In centimeters"
              placeholder="0"
              disabled={editFitnessProfileMutation.isPending}
              id={field().name}
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onChange={field().handleChange}
              error={field().state.meta.errors[0]?.message}
              minValue={minHeight}
              maxValue={maxHeight}
              step={1}
              format
              formatOptions={{
                style: 'decimal',
                maximumFractionDigits: 0,
                useGrouping: false
              }}
            />
          )}
        </form.Field>
        <form.Field name="weight">
          {field => (
            <NumberInputWithSteps
              label="Your weight"
              description="In kilograms"
              placeholder="0"
              disabled={editFitnessProfileMutation.isPending}
              id={field().name}
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onChange={field().handleChange}
              error={field().state.meta.errors[0]?.message}
              minValue={minWeight}
              maxValue={maxWeight}
              format
              formatOptions={{
                maximumFractionDigits: 2,
                useGrouping: false
              }}
            />
          )}
        </form.Field>
        <form.Field name="dateOfBirth">
          {field => (
            <DatePicker
              value={field().state.value}
              onValueChange={field().handleChange}
              error={field().state.meta.errors[0]?.message}
              min={minDateOfBirthDate}
              max={maxDateOfBirthDate}
              label="Date of Birth"
              disabled={editFitnessProfileMutation.isPending}
            />
          )}
        </form.Field>
      </div>
      <form.Field name="gender">
        {field => (
          <RadioGroup
            label="Gender"
            disabled={editFitnessProfileMutation.isPending}
            value={field().state.value}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]?.message}
            options={fitnessProfileGender}
            transformLabel={getGenderName}
          />
        )}
      </form.Field>
      <form.Field name="activityLevel">
        {field => (
          <RadioGroup
            label="Activity Level"
            disabled={editFitnessProfileMutation.isPending}
            value={field().state.value}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]?.message}
            options={fitnessProfileActivityLevel}
            transformLabel={getActivityLevelName}
          />
        )}
      </form.Field>
      <form.Field name="fitnessGoal">
        {field => (
          <RadioGroup
            label="Fitness Goal"
            disabled={editFitnessProfileMutation.isPending}
            value={field().state.value}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]?.message}
            options={fitnessProfileFitnessGoal}
            transformLabel={getFitnessGoalName}
          />
        )}
      </form.Field>
      <form.Field name="dietaryPreference">
        {field => (
          <RadioGroup
            label="Fitness Goal"
            disabled={editFitnessProfileMutation.isPending}
            value={field().state.value}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]?.message}
            options={fitnessProfileDietaryPreference}
            transformLabel={getDietaryPreferenceName}
          />
        )}
      </form.Field>
      <Button
        type="submit"
        class="mt-8"
        disabled={editFitnessProfileMutation.isPending}
      >
        {editFitnessProfileMutation.isPending && <LoaderCircle />}
        edit fitness profile
      </Button>
    </form>
  )
}
