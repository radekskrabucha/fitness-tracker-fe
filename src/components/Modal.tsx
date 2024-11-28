import { Dialog } from '@kobalte/core/dialog'
import {
  Show,
  splitProps,
  type ComponentProps,
  type FlowComponent,
  type JSXElement
} from 'solid-js'
import type { WithClass } from '~/types/common'
import { buttonVariants } from './Button'
import { cardVariants } from './Card'
import { Icon } from './Icon'

export type DialogRootProps = Omit<ComponentProps<typeof Dialog>, 'children'>
export type DialogContentProps = ComponentProps<typeof Dialog.Content>
export type DialogTriggerProps = WithClass<
  ComponentProps<typeof Dialog.Trigger>
>

type ModalProps = {
  icon?: JSXElement
  title: JSXElement
  description?: JSXElement
  content?: DialogContentProps
  trigger: JSXElement
} & DialogRootProps

export const Modal: FlowComponent<ModalProps> = props => {
  const [localProps, dialogRootProps] = splitProps(props, [
    'icon',
    'title',
    'description',
    'content',
    'trigger'
  ])

  return (
    <Dialog {...dialogRootProps}>
      {localProps.trigger}
      <Dialog.Portal>
        <Dialog.Overlay class="animate-show bg-background/10 fixed inset-0 z-1000 backdrop-blur-sm" />
        <Dialog.Content
          class={cardVariants({
            class:
              'animate-show fixed top-[50%] left-[50%] z-1001 h-[min(80vh,var(--container-xl))] w-[min(calc(100vw-48px),var(--container-3xl))] translate-x-[-50%] translate-y-[-50%] overflow-hidden !bg-white/50 !p-0'
          })}
        >
          <div class="flex flex-col gap-4 bg-white/50 px-6 py-8">
            <div class="flex items-center justify-between gap-2">
              <Dialog.Title class="line-clamp-2 text-3xl font-bold capitalize">
                {localProps.title}
              </Dialog.Title>
              <Show
                when={localProps.icon}
                fallback={<DefaultIcon />}
              >
                {localProps.icon}
              </Show>
            </div>
            <Show when={localProps.description}>
              {description => (
                <Dialog.Description class="line-clamp-3 text-current/50">
                  {description()}
                </Dialog.Description>
              )}
            </Show>
          </div>
          <div class="flex flex-1 flex-col gap-6 overflow-auto px-6 py-10">
            {props.children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

const DefaultIcon = () => (
  <Dialog.CloseButton class="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/20 hover:text-current/50">
    <Icon
      icon="close"
      class="size-4 fill-current transition-colors duration-150"
    />
  </Dialog.CloseButton>
)

export const ModalTrigger: FlowComponent<DialogTriggerProps> = props => (
  <Dialog.Trigger
    class={buttonVariants()}
    {...props}
  />
)
