import type { Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Modal, ModalTrigger } from '~/components/Modal'
import type { GetWorkoutPlanResponse } from '~/features/workoutPlan/types/response'
import { workoutToFormDefaultValues } from '../utils'
import { AddWorkoutSessionForm } from './AddWorkoutSessionForm'

type WorkoutCardProps = {
  workoutPlanId: string
} & GetWorkoutPlanResponse['workouts'][number]

export const AddWorkoutSessionModalContent: Component<
  WorkoutCardProps
> = props => (
  <Modal
    title="Add workout session"
    description="Add details below about your workout session."
    modal
    trigger={
      <ModalTrigger class={buttonVariants({ variant: 'primaryWhite' })}>
        Add workout session
      </ModalTrigger>
    }
  >
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-2 rounded-xl border-white/30 bg-white/40 px-4 py-2 text-black shadow-lg">
        <h2 class="text-2xl font-bold">{props.name}</h2>
        <p class="text-sm text-current/50">{props.description}</p>
      </div>
      <AddWorkoutSessionForm
        workoutId={props.id}
        workoutPlanId={props.workoutPlanId}
        defaultValues={workoutToFormDefaultValues(props.exercises)}
      />
    </div>
  </Modal>
)
