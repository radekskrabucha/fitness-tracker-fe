import { Popover } from '@kobalte/core/popover'
import { useNavigate } from '@solidjs/router'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { Show, type Component } from 'solid-js'
import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { LoaderCircle } from '~/components/LoaderCircle'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import {
  deleteFitnessProfile,
  getUserFitnessProfileQueryOptions
} from '../actions'

type EditFitnessProfileMenuProps = {
  userId: string
}

export const EditFitnessProfileMenu: Component<
  EditFitnessProfileMenuProps
> = props => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const deleteFitnessProfileMutation = createMutation(() => ({
    mutationFn: deleteFitnessProfile,
    onSuccess: async () => {
      toast.show({
        title: 'Profile deleted successfully!',
        description: 'Your fitness profile has been deleted successfully.',
        variant: 'success',
        priority: 'high'
      })
      navigate(InternalLink.profile, { replace: true })
      await queryClient.invalidateQueries(
        {
          queryKey: getUserFitnessProfileQueryOptions(props.userId).queryKey,
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
    <Popover gutter={8}>
      <Popover.Trigger>
        <Button
          variant="outline"
          class="size-10 shrink-0 rounded-full border border-black/20 p-0 hover:border-black/10 hover:text-current/70"
        >
          <Icon
            id="menu-dots"
            class="size-5 fill-current transition-colors duration-150"
          />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content class="popover flex w-full origin-[var(--kb-hovercard-content-transform-origin)] flex-col items-center gap-4 overflow-hidden rounded-md border border-white px-6 py-4 text-black shadow-lg backdrop-blur-lg">
          <Button
            onClick={() => deleteFitnessProfileMutation.mutate()}
            disabled={deleteFitnessProfileMutation.isPending}
            class="text-error self-stretch"
            variant="link"
          >
            <Show when={deleteFitnessProfileMutation.isPending}>
              <LoaderCircle />
            </Show>
            Delete fitness profile
            <Icon
              id="delete"
              class="h-4 w-4 fill-current transition-colors duration-150"
            />
          </Button>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  )
}
