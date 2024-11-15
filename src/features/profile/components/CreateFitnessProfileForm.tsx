import { reset, setValue } from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
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
  fitnessProfileGender
} from '~/models/profile'
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
  minWeight,
  maxWeight,
  maxDateOfBirthDate,
  minDateOfBirthDate
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
      onSubmit={values => {
        createFitnessProfileMutation.mutate({
          ...values,
          dateOfBirth: new Date(values.dateOfBirth),
          height: Number(values.height),
          weight: Number(values.weight)
        })
      }}
      class="my-auto flex w-full max-w-xl flex-col gap-8 self-center text-left"
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
            <NumberInputWithSteps
              label="Your weight"
              description="In kilograms"
              placeholder="0"
              disabled={createFitnessProfileMutation.isPending}
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
            />
          )}
        </Field>
      </div>

      <Field
        name="gender"
        validate={genderValidation}
      >
        {(field, props) => (
          <RadioGroup
            label="Gender"
            disabled={createFitnessProfileMutation.isPending}
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

      <Field
        name="activityLevel"
        validate={activityLevelValidation}
      >
        {(field, props) => (
          <RadioGroup
            label="Activity level"
            disabled={createFitnessProfileMutation.isPending}
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

      <Field
        name="fitnessGoal"
        validate={fitnessGoalValidation}
      >
        {(field, props) => (
          <RadioGroup
            label="Fitness goal"
            disabled={createFitnessProfileMutation.isPending}
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
            disabled={createFitnessProfileMutation.isPending}
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
        disabled={createFitnessProfileMutation.isPending}
      >
        {createFitnessProfileMutation.isPending && <LoaderCircle />}
        Create fitness profile
      </Button>
    </Form>
  )
}
