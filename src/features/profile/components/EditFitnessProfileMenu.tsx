import { useNavigate } from '@solidjs/router'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { Show, type Component } from 'solid-js'
import { Button, buttonVariants } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { LoaderCircle } from '~/components/LoaderCircle'
import { PopoverContent, Popover } from '~/components/Popover'
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
          class="size-10 shrink-0 rounded-full border border-black/20 bg-white p-0 shadow-md hover:border-black/10 hover:text-current/70"
        >
          <Icon
            id="menu-dots"
            class="size-5 fill-current transition-colors duration-150"
          />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <PopoverContent>
          <Link
            href={InternalLink.editFitnessProfile}
            class={buttonVariants({
              variant: 'link',
              class: 'justify-normal self-stretch'
            })}
          >
            <Icon
              id="edit"
              class="h-4 w-4 fill-current transition-colors duration-150"
            />
            Edit profile
          </Link>
          <Button
            onClick={() => deleteFitnessProfileMutation.mutate()}
            disabled={deleteFitnessProfileMutation.isPending}
            class="text-error self-stretch"
            variant="link"
          >
            <Show when={deleteFitnessProfileMutation.isPending}>
              <LoaderCircle />
            </Show>
            <Icon
              id="delete"
              class="h-4 w-4 fill-current transition-colors duration-150"
            />
            Delete fitness profile
          </Button>
        </PopoverContent>
      </Popover.Portal>
    </Popover>
  )
}
