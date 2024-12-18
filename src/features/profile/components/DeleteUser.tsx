import { useNavigate } from '@solidjs/router'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import type { Component } from 'solid-js'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { getUserWorkoutPlansQueryOptions } from '~/features/home/actions'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import {
  getUserLatestWorkoutSessionQueryOptions,
  getUserWorkoutSessionsQueryOptions
} from '~/features/userWorkoutSessions/actions'
import { deleteUser, getUserFitnessProfileQueryOptions } from '../actions'

type DeleteUserProps = {
  userId: string
}

export const DeleteUser: Component<DeleteUserProps> = props => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const deleteUserMutation = createMutation(() => ({
    mutationFn: deleteUser,
    mutationKey: ['deleteUser'],
    onSuccess: async () => {
      navigate(InternalLink.home, { replace: true })
      toast.show({
        title: 'Profile deleted successfully!',
        description: 'Your profile has been deleted successfully.',
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
      await queryClient.invalidateQueries(
        {
          queryKey: getSessionQueryOptions().queryKey,
          exact: true,
          refetchType: 'all'
        },
        { throwOnError: true, cancelRefetch: true }
      )
      await queryClient.invalidateQueries(
        {
          queryKey: getUserWorkoutPlansQueryOptions(props.userId).queryKey,
          exact: true,
          refetchType: 'all'
        },
        { throwOnError: true, cancelRefetch: true }
      )
      await queryClient.invalidateQueries(
        {
          queryKey: getUserWorkoutSessionsQueryOptions(props.userId).queryKey,
          exact: true,
          refetchType: 'all'
        },
        { throwOnError: true, cancelRefetch: true }
      )
      await queryClient.invalidateQueries(
        {
          queryKey: getUserLatestWorkoutSessionQueryOptions(props.userId)
            .queryKey,
          exact: true,
          refetchType: 'all'
        },
        { throwOnError: true, cancelRefetch: true }
      )
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
    <>
      <div class="my-auto flex w-full max-w-96 flex-col gap-4 self-center">
        <Button
          variant="primaryDanger"
          disabled={deleteUserMutation.isPending}
          onClick={() => deleteUserMutation.mutate()}
        >
          {deleteUserMutation.isPending && <LoaderCircle />}
          Delete your profile
        </Button>
      </div>
    </>
  )
}
