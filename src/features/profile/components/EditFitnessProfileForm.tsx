import { reset, setValue } from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import type { Component } from 'solid-js'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { NumberInput } from '~/components/NumberInput'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import type { CreateFitnessProfile } from '~/models/profile'
import { sleep } from '~/utils/common'
import {
  editFitnessProfile,
  getUserFitnessProfileQueryOptions
} from '../actions'
import {
  maxAge,
  maxHeight,
  maxWeight,
  minAge,
  minHeight,
  minWeight
} from '../form/createFitnessProfileForm'
import {
  useEditFitnessProfileForm,
  heightValidation,
  ageValidation,
  weightValidation
} from '../form/editFitnessProfileForm'

type EditFitnessProfileFormProps = {
  initialValues: CreateFitnessProfile
  userId: string
}

export const EditFitnessProfileForm: Component<
  EditFitnessProfileFormProps
> = props => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { form, Form, Field } = useEditFitnessProfileForm(props.initialValues)
  const editFitnessProfileMutation = createMutation(() => ({
    mutationFn: editFitnessProfile,
    mutationKey: ['editFitnessProfile'],
    onSuccess: async res => {
      queryClient.setQueryData(
        getUserFitnessProfileQueryOptions(props.userId).queryKey,
        () => res
      )
      reset(form)
      toast.show({
        title: 'Profile updated successfully!',
        description: 'Your fitness profile has been updated successfully.',
        variant: 'success',
        priority: 'high'
      })
      await sleep(3000)
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
        editFitnessProfileMutation.mutate({
          height: values.height ? Number(values.height) : undefined,
          age: values.age ? Number(values.age) : undefined,
          weight: values.weight ? Number(values.weight) : undefined,
          dietaryPreference: values.dietaryPreference
            ? values.dietaryPreference
            : null,
          fitnessGoal: values.fitnessGoal ? values.fitnessGoal : undefined,
          gender: values.gender ? values.gender : undefined,
          activityLevel: values.activityLevel ? values.activityLevel : undefined
        })
      }
      class="my-auto flex w-full max-w-80 flex-col gap-4 self-center"
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
            disabled={editFitnessProfileMutation.isPending}
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
            disabled={editFitnessProfileMutation.isPending}
            minValue={minWeight}
            maxValue={maxWeight}
            step={1}
            format
            formatOptions={{
              style: 'decimal',
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
            disabled={editFitnessProfileMutation.isPending}
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

      <Field name="activityLevel">
        {(field, props) => (
          <TextInput
            label="Activity level"
            disabled={editFitnessProfileMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>

      <Field name="fitnessGoal">
        {(field, props) => (
          <TextInput
            label="Fitness goal"
            disabled={editFitnessProfileMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>

      <Field name="dietaryPreference">
        {(field, props) => (
          <TextInput
            label="Dietary preference"
            disabled={editFitnessProfileMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>

      <Button
        type="submit"
        class="mt-8"
        disabled={editFitnessProfileMutation.isPending}
      >
        {editFitnessProfileMutation.isPending && <LoaderCircle />}
        Edit fitness profile
      </Button>
    </Form>
  )
}
