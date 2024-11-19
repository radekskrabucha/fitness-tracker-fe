import { useNavigate } from '@solidjs/router'
import { useQueryClient } from '@tanstack/solid-query'
import { createMutation } from '@tanstack/solid-query'
import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import {
  deleteFitnessProfile,
  getUserFitnessProfileQueryOptions
} from '../actions'

type DeleteFitnessProfileProps = {
  userId: string
}

export const DeleteFitnessProfile: Component<
  DeleteFitnessProfileProps
> = props => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const deleteFitnessProfileMutation = createMutation(() => ({
    mutationFn: deleteFitnessProfile,
    mutationKey: ['deleteFitnessProfile'],
    onSuccess: async () => {
      navigate(InternalLink.profile, { replace: true })
      toast.show({
        title: 'Profile deleted successfully!',
        description: 'Your fitness profile has been deleted successfully.',
        variant: 'success',
        priority: 'high'
      })
      await queryClient.invalidateQueries(
        {
          queryKey: getUserFitnessProfileQueryOptions(props.userId).queryKey,
          exact: true,
          refetchType: 'all'
        },
        { throwOnError: true, cancelRefetch: true }
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
    <div class="my-auto flex flex-col items-center gap-8 self-center">
      <div class="flex w-full max-w-48 flex-col gap-4">
        <Button
          onClick={() => deleteFitnessProfileMutation.mutate()}
          disabled={deleteFitnessProfileMutation.isPending}
          class="bg-error hover:bg-error/80 disabled:bg-error/50"
        >
          <Show when={deleteFitnessProfileMutation.isPending}>
            <LoaderCircle />
          </Show>
          Delete fitness profile
        </Button>
      </div>
    </div>
  )
}
