import { reset, setValue } from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
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
  fitnessProfileGender,
  type CreateFitnessProfile
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
  useEditFitnessProfileForm,
  heightValidation,
  weightValidation
} from '../form/editFitnessProfileForm'
import {
  getActivityLevelName,
  getDietaryPreferenceName,
  getFitnessGoalName,
  getGenderName
} from '../utils'

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
      onSubmit={values => {
        if (form.dirty) {
          editFitnessProfileMutation.mutate({
            height: nonNullable(values.height)
              ? Number(values.height)
              : undefined,
            dateOfBirth: nonNullable(values.dateOfBirth)
              ? new Date(values.dateOfBirth).toString()
              : undefined,
            weight: nonNullable(values.weight)
              ? Number(values.weight)
              : undefined,
            dietaryPreference: nonNullable(values.dietaryPreference)
              ? values.dietaryPreference
              : undefined,
            fitnessGoal: nonNullable(values.fitnessGoal)
              ? values.fitnessGoal
              : undefined,
            gender: nonNullable(values.gender) ? values.gender : undefined,
            activityLevel: nonNullable(values.activityLevel)
              ? values.activityLevel
              : undefined
          })
        }
      }}
      class="my-auto flex w-full max-w-xl flex-col gap-8 self-center text-left"
      shouldTouched
      shouldDirty
    >
      <div class="flex flex-1 flex-wrap gap-6">
        <Field
          name="height"
          validate={heightValidation}
        >
          {(field, props) => (
            <NumberInputWithSteps
              label="Your height"
              description="In centimeters"
              placeholder="0"
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
            <NumberInputWithSteps
              label="Your weight"
              description="In kilograms"
              placeholder="0"
              disabled={editFitnessProfileMutation.isPending}
              minValue={minWeight}
              maxValue={maxWeight}
              step={1}
              format
              formatOptions={{
                maximumFractionDigits: 2,
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

        <Field name="dateOfBirth">
          {field => (
            <DatePicker
              value={field.value}
              onValueChange={value => {
                setValue(form, 'dateOfBirth', value)
              }}
              min={minDateOfBirthDate}
              max={maxDateOfBirthDate}
              label="Date of Birth"
              disabled={editFitnessProfileMutation.isPending}
            />
          )}
        </Field>
      </div>

      <Field name="gender">
        {(field, props) => (
          <RadioGroup
            label="Gender"
            disabled={editFitnessProfileMutation.isPending}
            {...field}
            {...props}
            onChange={value => {
              setValue(form, 'gender', value)
            }}
            options={fitnessProfileGender}
            transformLabel={getGenderName}
          />
        )}
      </Field>

      <Field name="activityLevel">
        {(field, props) => (
          <RadioGroup
            label="Activity level"
            disabled={editFitnessProfileMutation.isPending}
            {...field}
            {...props}
            onChange={value => {
              setValue(form, 'activityLevel', value)
            }}
            options={fitnessProfileActivityLevel}
            transformLabel={getActivityLevelName}
          />
        )}
      </Field>

      <Field name="fitnessGoal">
        {(field, props) => (
          <RadioGroup
            label="Fitness goal"
            disabled={editFitnessProfileMutation.isPending}
            {...field}
            {...props}
            onChange={value => {
              setValue(form, 'fitnessGoal', value)
            }}
            options={fitnessProfileFitnessGoal}
            transformLabel={getFitnessGoalName}
          />
        )}
      </Field>

      <Field name="dietaryPreference">
        {(field, props) => (
          <RadioGroup
            label="Dietary preference (optional)"
            disabled={editFitnessProfileMutation.isPending}
            {...field}
            {...props}
            onChange={value => {
              setValue(form, 'dietaryPreference', value)
            }}
            options={fitnessProfileDietaryPreference}
            transformLabel={getDietaryPreferenceName}
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
