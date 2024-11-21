import { useNavigate } from '@solidjs/router'
import { createForm } from '@tanstack/solid-form'
import { createMutation } from '@tanstack/solid-query'
import { zodValidator, type ZodValidator } from '@tanstack/zod-form-adapter'
import { FetchError } from 'ofetch'
import { Index, Match, Show, Switch, type Component } from 'solid-js'
import { Button } from '~/components/Button'
import { Checkbox } from '~/components/Checkbox'
import { LoaderCircle } from '~/components/LoaderCircle'
import { NumberInputWithSteps } from '~/components/NumberInputWithSteps'
import { RadioGroup } from '~/components/RadioGroup'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import {
  daysOfWeekOptions,
  intensityLevelOptions,
  type WorkoutAttributeIntensityLevel
} from '~/models/workoutAttributes'
import { chooseWorkoutPlan } from '../actions'
import { type Form } from '../form/chooseWorkoutPlanForm'
import {
  getWorkoutAttributeIntensityLevelName,
  getWorkoutAttributeName,
  getWorkoutExerciseAttributeName,
  transformFormToRequest
} from '../utils'
import { WeekDaySwitch } from './WeekDaySwitch'

type ChooseWorkoutPlanForm = {
  defaultValues: Form
  workoutPlanId: string
}

export const ChooseWorkoutPlanForm: Component<
  ChooseWorkoutPlanForm
> = props => {
  const navigate = useNavigate()
  const form = createForm<Form, ZodValidator>(() => ({
    defaultValues: props.defaultValues,
    onSubmit: ({ value }) => {
      chooseWorkoutPlanMutation.mutate({
        workoutPlanId: props.workoutPlanId,
        ...transformFormToRequest(value)
      })
    },
    validatorAdapter: zodValidator()
  }))
  const chooseWorkoutPlanMutation = createMutation(() => ({
    mutationFn: chooseWorkoutPlan,
    mutationKey: ['chooseWorkoutPlan'],
    onSuccess: () => {
      form.reset()
      toast.show({
        title: "You've chosen a workout plan!",
        description: 'Your workout plan has been chosen successfully.',
        variant: 'success',
        priority: 'high'
      })
      navigate(InternalLink.profile)
    },
    onError: error => {
      if (error instanceof FetchError && error.status === 401) {
        return toast.show({
          title: 'Oops! You have to sign in first 🤓',
          description: 'Please sign in to continue.',
          variant: 'error',
          priority: 'high'
        })
      }
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
      class="my-auto flex w-full max-w-xl flex-col gap-12 self-center text-left"
    >
      <Index each={form.state.values.workouts}>
        {(workout, workoutIndex) => (
          <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-2 rounded-xl border-white/30 bg-white/40 px-4 py-2 text-black shadow-lg">
              <h2 class="text-2xl font-bold">{workout().name}</h2>
              <p class="text-sm text-current/50">{workout().description}</p>
            </div>
            <div class="flex flex-col gap-4">
              <h3 class="text-xl font-bold">Days of week</h3>
              <div class="flex flex-wrap gap-4">
                <form.Subscribe
                  selector={state =>
                    state.values.workouts[workoutIndex]?.attributes
                  }
                >
                  {field => (
                    <Show when={field()}>
                      {attributes => (
                        <Index each={daysOfWeekOptions}>
                          {dayOfWeek => (
                            <WeekDaySwitch
                              disabled={chooseWorkoutPlanMutation.isPending}
                              dayOfWeek={dayOfWeek()}
                              onClick={({ dayOfWeek, index, isSelected }) => {
                                if (isSelected) {
                                  return form.removeFieldValue(
                                    `workouts[${workoutIndex}].attributes`,
                                    index
                                  )
                                }

                                return form.pushFieldValue(
                                  `workouts[${workoutIndex}].attributes`,
                                  {
                                    id: dayOfWeek,
                                    name: 'days_of_week',
                                    value: dayOfWeek
                                  }
                                )
                              }}
                              attributes={attributes()}
                            />
                          )}
                        </Index>
                      )}
                    </Show>
                  )}
                </form.Subscribe>
              </div>
              <Index each={workout().attributes}>
                {(attribute, attributeIndex) => (
                  <Switch>
                    <Match when={attribute().name === 'intensity_level'}>
                      <form.Field
                        name={`workouts[${workoutIndex}].attributes[${attributeIndex}].value`}
                      >
                        {field => (
                          <RadioGroup
                            label={getWorkoutAttributeName(attribute().name)}
                            disabled={chooseWorkoutPlanMutation.isPending}
                            id={field().name}
                            name={field().name}
                            value={
                              field().state
                                .value as WorkoutAttributeIntensityLevel
                            }
                            onChange={value => field().handleChange(value)}
                            options={intensityLevelOptions}
                            transformLabel={
                              getWorkoutAttributeIntensityLevelName
                            }
                          />
                        )}
                      </form.Field>
                    </Match>
                    <Match
                      when={
                        attribute().name === 'rest_period_between_sets' ||
                        attribute().name === 'duration_goal'
                      }
                    >
                      <form.Field
                        name={`workouts[${workoutIndex}].attributes[${attributeIndex}].value`}
                      >
                        {field => (
                          <NumberInputWithSteps
                            class="max-w-44"
                            label={getWorkoutAttributeName(attribute().name)}
                            description="In minutes"
                            placeholder="0"
                            disabled={chooseWorkoutPlanMutation.isPending}
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
                    </Match>
                    <Match
                      when={
                        attribute().name === 'cooldown_required' ||
                        attribute().name === 'warmup_required'
                      }
                    >
                      <form.Field
                        name={`workouts[${workoutIndex}].attributes[${attributeIndex}].value`}
                      >
                        {field => (
                          <Checkbox
                            label={getWorkoutAttributeName(attribute().name)}
                            disabled={chooseWorkoutPlanMutation.isPending}
                            id={field().name}
                            name={field().name}
                            value={field().state.value.toString()}
                            onChange={value => field().handleChange(value)}
                            checked={field().state.value as boolean}
                            error={field().state.meta.errors[0]}
                          />
                        )}
                      </form.Field>
                    </Match>
                  </Switch>
                )}
              </Index>

              <div class="flex flex-col gap-8">
                <h3 class="text-xl font-bold">Exercises</h3>
                <Index each={workout().exercises}>
                  {(exercise, exerciseIndex) => (
                    <div class="flex flex-col gap-2">
                      <h2 class="text-lg font-bold">{exercise().name}</h2>

                      <div class="flex flex-1 flex-wrap gap-6">
                        <Index each={exercise().attributes}>
                          {(attribute, attributeIndex) => (
                            <form.Field
                              name={`workouts[${workoutIndex}].exercises[${exerciseIndex}].attributes[${attributeIndex}].value`}
                            >
                              {field => (
                                <NumberInputWithSteps
                                  class="max-w-44"
                                  label={getWorkoutExerciseAttributeName(
                                    attribute().name
                                  )}
                                  placeholder="0"
                                  disabled={chooseWorkoutPlanMutation.isPending}
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
                    </div>
                  )}
                </Index>
              </div>
            </div>
          </div>
        )}
      </Index>

      <Button
        type="submit"
        class="mt-8"
        disabled={chooseWorkoutPlanMutation.isPending}
      >
        {chooseWorkoutPlanMutation.isPending && <LoaderCircle />}
        Start workout
      </Button>
    </form>
  )
}
