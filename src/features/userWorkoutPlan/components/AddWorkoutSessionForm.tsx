import { useNavigate } from '@solidjs/router'
import { createForm } from '@tanstack/solid-form'
import { createMutation } from '@tanstack/solid-query'
import { zodValidator, type ZodValidator } from '@tanstack/zod-form-adapter'
import { Index, Show, type Component } from 'solid-js'
import { Button } from '~/components/Button'
import { Checkbox } from '~/components/Checkbox'
import { LoaderCircle } from '~/components/LoaderCircle'
import { NumberInputWithSteps } from '~/components/NumberInputWithSteps'
import { TextAreaInput } from '~/components/TextAreaInput'
import { toast } from '~/components/Toast'
import { DatePicker } from '~/components/datePicker/DatePicker'
import { InternalLink } from '~/config/app'
import { getWorkoutExerciseAttributeName } from '~/features/workoutPlan/utils'
import { addWorkoutSession } from '../actions'
import {
  maxDateOfWorkout,
  minDateOfWorkout,
  type Form
} from '../form/addWorkoutSessionForm'
import { transformFormToRequest } from '../utils'

type AddWorkoutSessionFormProps = {
  defaultValues: Form
  workoutPlanId: string
  workoutId: string
}

export const AddWorkoutSessionForm: Component<
  AddWorkoutSessionFormProps
> = props => {
  const navigate = useNavigate()
  const form = createForm<Form, ZodValidator>(() => ({
    defaultValues: props.defaultValues,
    onSubmit: ({ value }) => {
      addWorkoutSessionMutation.mutate(
        transformFormToRequest({
          workout: value,
          workoutPlanId: props.workoutPlanId,
          workoutId: props.workoutId
        })
      )
    },
    validatorAdapter: zodValidator()
  }))
  const addWorkoutSessionMutation = createMutation(() => ({
    mutationFn: addWorkoutSession,
    mutationKey: ['addWorkoutSession'],
    onSuccess: async ({ id }) => {
      form.reset()
      toast.show({
        title: 'Added workout session!',
        description: 'Your workout session has been added successfully.',
        variant: 'success',
        priority: 'high'
      })
      navigate(InternalLink.userWorkoutSession(id))
    },
    onError: () => {
      toast.show({
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
      class="my-auto flex w-full max-w-xl flex-col gap-12 self-center text-left"
    >
      <div class="flex flex-1 flex-wrap gap-6">
        <form.Field name="duration">
          {field => (
            <NumberInputWithSteps
              class="max-w-44"
              label="Workout duration"
              description="In minutes"
              placeholder="0"
              disabled={addWorkoutSessionMutation.isPending}
              id={field().name}
              name={field().name}
              value={field().state.value.toString()}
              onBlur={field().handleBlur}
              onChange={value => field().handleChange(Number(value))}
              error={field().state.meta.errors[0]}
              minValue={0}
              maxValue={1000}
              step={5}
              format
              formatOptions={{
                style: 'decimal',
                maximumFractionDigits: 0,
                useGrouping: false
              }}
            />
          )}
        </form.Field>
        <form.Field name="date">
          {field => (
            <DatePicker
              value={field().state.value}
              onValueChange={field().handleChange}
              error={field().state.meta.errors[0]}
              min={minDateOfWorkout}
              max={maxDateOfWorkout}
              label="Date"
              disabled={addWorkoutSessionMutation.isPending}
            />
          )}
        </form.Field>
      </div>
      <form.Field name="notes">
        {field => (
          <TextAreaInput
            label="Notes (optional)"
            disabled={addWorkoutSessionMutation.isPending}
            id={field().name}
            name={field().name}
            value={field().state.value}
            onBlur={field().handleBlur}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]}
          />
        )}
      </form.Field>

      <div class="flex flex-col gap-8">
        <h3 class="text-xl font-bold">Exercises</h3>
        <Index each={form.state.values.exercises}>
          {(exercise, exerciseIndex) => (
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-bold">{exercise().name}</h2>
              <form.Field name={`exercises[${exerciseIndex}].completed`}>
                {field => (
                  <Checkbox
                    label="Completed"
                    disabled={addWorkoutSessionMutation.isPending}
                    id={field().name}
                    name={field().name}
                    value={field().state.value.toString()}
                    onChange={value => field().handleChange(value)}
                    checked={field().state.value as boolean}
                    error={field().state.meta.errors[0]}
                  />
                )}
              </form.Field>
              <form.Field name={`exercises[${exerciseIndex}].notes`}>
                {field => (
                  <TextAreaInput
                    label="Notes (optional)"
                    disabled={addWorkoutSessionMutation.isPending}
                    id={field().name}
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={field().handleChange}
                    error={field().state.meta.errors[0]}
                  />
                )}
              </form.Field>
              <form.Subscribe
                selector={state =>
                  state.values.exercises[exerciseIndex]?.completed
                }
              >
                {field => (
                  <Show when={field()}>
                    <div class="flex flex-1 flex-wrap gap-6">
                      <Index each={exercise().attributes}>
                        {(attribute, attributeIndex) => (
                          <form.Field
                            name={`exercises[${exerciseIndex}].attributes[${attributeIndex}].value`}
                          >
                            {field => (
                              <NumberInputWithSteps
                                class="max-w-44"
                                label={getWorkoutExerciseAttributeName(
                                  attribute().name
                                )}
                                placeholder="0"
                                disabled={addWorkoutSessionMutation.isPending}
                                id={field().name}
                                name={field().name}
                                value={field().state.value.toString()}
                                onBlur={field().handleBlur}
                                onChange={value =>
                                  field().handleChange(Number(value))
                                }
                                error={field().state.meta.errors[0]}
                                minValue={0}
                                maxValue={1000}
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
                        )}
                      </Index>
                    </div>
                  </Show>
                )}
              </form.Subscribe>
            </div>
          )}
        </Index>
      </div>
      <Button
        type="submit"
        class="mt-8"
        disabled={addWorkoutSessionMutation.isPending}
      >
        {addWorkoutSessionMutation.isPending && <LoaderCircle />}
        Add workout session
      </Button>
    </form>
  )
}
