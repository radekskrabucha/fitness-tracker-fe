import { Checkbox as KCheckbox } from '@kobalte/core/checkbox'
import {
  Show,
  splitProps,
  type Component,
  type ComponentProps,
  type JSXElement
} from 'solid-js'
import { cn } from '~/utils/styles'
import { Icon } from './Icon'
import { statusMessageVariants } from './StatusMessage'

type A = ComponentProps<typeof KCheckbox>
type CheckboxFieldProps = Pick<
  ComponentProps<typeof KCheckbox>,
  | 'checked'
  | 'defaultChecked'
  | 'disabled'
  | 'indeterminate'
  | 'onChange'
  | 'value'
  | 'name'
  | 'required'
  | 'disabled'
  | 'readOnly'
  | 'id'
  | 'as'
  | 'onPointerDown'
>

type CheckboxProps = {
  label: JSXElement
  error?: JSXElement
  description?: JSXElement
} & CheckboxFieldProps

export const Checkbox: Component<CheckboxProps> = props => {
  const [localProps, others] = splitProps(props, [
    'label',
    'description',
    'error'
  ])

  return (
    <KCheckbox
      {...others}
      validationState={localProps.error ? 'invalid' : 'valid'}
      class={cn('flex flex-1 flex-col gap-2')}
    >
      <div class="flex items-center gap-2">
        <KCheckbox.Control class="flex size-7 items-center justify-center rounded-md bg-white p-0.5">
          <KCheckbox.Indicator class="animate-show flex h-full w-full flex-1 shrink-0 items-center justify-center rounded-md bg-black/10">
            <Icon
              icon="tick"
              class="size-4"
            />
          </KCheckbox.Indicator>
        </KCheckbox.Control>
        <KCheckbox.Label>{localProps.label}</KCheckbox.Label>
      </div>
      <Show when={localProps.description}>
        {description => (
          <KCheckbox.Description
            as="span"
            class={statusMessageVariants({ class: '-mt-2' })}
          >
            {description()}
          </KCheckbox.Description>
        )}
      </Show>
      <Show when={localProps.error}>
        {message => (
          <KCheckbox.ErrorMessage
            class={statusMessageVariants({
              variant: 'error',
              class: 'animate-reveal'
            })}
          >
            {message()}
          </KCheckbox.ErrorMessage>
        )}
      </Show>
    </KCheckbox>
  )
}
