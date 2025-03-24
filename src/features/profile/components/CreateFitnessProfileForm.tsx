import { useNavigate } from '@solidjs/router'
import { createForm } from '@tanstack/solid-form'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
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
  fitnessProfileGender,
  type FitnessProfileActivityLevel,
  type FitnessProfileDietaryPreference,
  type FitnessProfileFitnessGoal,
  type FitnessProfileGender
} from '~/models/profile'
import { nonNullable } from '~/utils/common'
import {
  createFitnessProfile,
  getUserFitnessProfileQueryOptions
} from '../actions'
import {
  createFitnessProfileSchema,
  maxDateOfBirthDate,
  minDateOfBirthDate,
  maxWeight,
  minWeight,
  maxHeight,
  minHeight
} from '../form/createFitnessProfileForm'
import {
  getActivityLevelName,
  getDietaryPreferenceName,
  getFitnessGoalName,
  getGenderName
} from '../utils'

export const CreateFitnessProfileForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = createForm(() => ({
    defaultValues: {
      gender: '' as FitnessProfileGender,
      activityLevel: '' as FitnessProfileActivityLevel,
      fitnessGoal: '' as FitnessProfileFitnessGoal,
      dateOfBirth: '',
      height: '170',
      weight: '70',
      dietaryPreference: '' as FitnessProfileDietaryPreference
    },
    onSubmit: ({ value }) =>
      createFitnessProfileMutation.mutate({
        ...value,
        dateOfBirth: new Date(value.dateOfBirth).toString(),
        height: Number(value.height),
        weight: Number(value.weight),
        dietaryPreference: nonNullable(value.dietaryPreference)
          ? value.dietaryPreference
          : null
      }),
    validators: {
      onSubmit: createFitnessProfileSchema
    }
  }))
  const createFitnessProfileMutation = createMutation(() => ({
    mutationFn: createFitnessProfile,
    mutationKey: ['createFitnessProfile'],
    onSuccess: data => {
      toast.show({
        title: 'Profile created successfully!',
        description: 'Your profile has been created successfully.',
        variant: 'success',
        priority: 'high'
      })
      form.reset()
      queryClient.setQueryData(
        getUserFitnessProfileQueryOptions(data.userId).queryKey,
        () => data
      )
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
              disabled={createFitnessProfileMutation.isPending}
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
              disabled={createFitnessProfileMutation.isPending}
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
              disabled={createFitnessProfileMutation.isPending}
            />
          )}
        </form.Field>
      </div>
      <form.Field name="gender">
        {field => (
          <RadioGroup
            label="Gender"
            disabled={createFitnessProfileMutation.isPending}
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
            disabled={createFitnessProfileMutation.isPending}
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
            disabled={createFitnessProfileMutation.isPending}
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
            disabled={createFitnessProfileMutation.isPending}
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
        disabled={createFitnessProfileMutation.isPending}
      >
        {createFitnessProfileMutation.isPending && <LoaderCircle />}
        Create fitness profile
      </Button>
    </form>
  )
}
