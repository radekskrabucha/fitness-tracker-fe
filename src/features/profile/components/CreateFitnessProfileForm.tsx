import { reset, setValue } from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { NumberInput } from '~/components/NumberInput'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import {
  createFitnessProfile,
  getUserFitnessProfileQueryOptions
} from '../actions'
import {
  Form,
  Field,
  form,
  heightValidation,
  genderValidation,
  activityLevelValidation,
  fitnessGoalValidation,
  minHeight,
  maxHeight,
  weightValidation,
  ageValidation,
  minWeight,
  maxWeight,
  minAge,
  maxAge
} from '../form/createFitnessProfileForm'

export const CreateFitnessProfileForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
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
      reset(form)
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
    <Form
      onSubmit={values =>
        createFitnessProfileMutation.mutate({
          ...values,
          age: Number(values.age),
          height: Number(values.height),
          weight: Number(values.weight)
        })
      }
      class="my-auto flex w-full max-w-80 flex-col gap-4 self-center text-left"
      shouldTouched
      shouldDirty
    >
      <Field
        name="height"
        validate={heightValidation}
      >
        {(field, props) => (
          <NumberInput
            label="Your height"
            description="In centimeters"
            disabled={createFitnessProfileMutation.isPending}
            minValue={minHeight}
            maxValue={maxHeight}
            step={1}
            format
            formatOptions={{
              style: 'decimal',
              maximumFractionDigits: 0,
              useGrouping: false
            }}
            required
            {...field}
            {...props}
            onChange={value => {
              setValue(form, 'height', value)
            }}
          />
        )}
      </Field>
      <Field
        name="weight"
        validate={weightValidation}
      >
        {(field, props) => (
          <NumberInput
            label="Your weight"
            description="In kilograms"
            disabled={createFitnessProfileMutation.isPending}
            minValue={minWeight}
            maxValue={maxWeight}
            step={1}
            format
            formatOptions={{
              maximumFractionDigits: 3,
              useGrouping: false
            }}
            required
            {...field}
            {...props}
            onChange={value => {
              setValue(form, 'weight', value)
            }}
          />
        )}
      </Field>
      <Field
        name="age"
        validate={ageValidation}
      >
        {(field, props) => (
          <NumberInput
            label="Your age"
            disabled={createFitnessProfileMutation.isPending}
            minValue={minAge}
            maxValue={maxAge}
            step={1}
            format
            formatOptions={{
              style: 'decimal',
              maximumFractionDigits: 0,
              useGrouping: false
            }}
            required
            {...field}
            {...props}
            onChange={value => {
              setValue(form, 'age', value)
            }}
          />
        )}
      </Field>

      <Field
        name="gender"
        validate={genderValidation}
      >
        {(field, props) => (
          <TextInput
            description="Male, female, other, prefer not to say"
            label="Gender"
            disabled={createFitnessProfileMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>

      <Field
        name="activityLevel"
        validate={activityLevelValidation}
      >
        {(field, props) => (
          <TextInput
            label="Activity level"
            disabled={createFitnessProfileMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>

      <Field
        name="fitnessGoal"
        validate={fitnessGoalValidation}
      >
        {(field, props) => (
          <TextInput
            label="Fitness goal"
            disabled={createFitnessProfileMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>

      <Field name="dietaryPreference">
        {(field, props) => (
          <TextInput
            label="dietaryPreference"
            disabled={createFitnessProfileMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>

      <Button
        type="submit"
        class="mt-8"
        disabled={createFitnessProfileMutation.isPending}
      >
        {createFitnessProfileMutation.isPending && <LoaderCircle />}
        Create fitness profile
      </Button>
    </Form>
  )
}
