import { TextField } from '@kobalte/core/text-field'
import {
  Show,
  type Component,
  type JSXElement,
  type ComponentProps,
  splitProps
} from 'solid-js'
import { statusMessageVariants } from './StatusMessage'

type InputProps = Pick<
  ComponentProps<'input'>,
  | 'ref'
  | 'onBlur'
  | 'onFocus'
  | 'autofocus'
  | 'autoCapitalize'
  | 'autocomplete'
  | 'autocorrect'
>

type TextFieldProps = Pick<
  ComponentProps<typeof TextField>,
  | 'as'
  | 'id'
  | 'name'
  | 'required'
  | 'disabled'
  | 'readOnly'
  | 'value'
  | 'defaultValue'
>
type TextFieldInputProps = Pick<
  ComponentProps<typeof TextField.Input>,
  'onInput'
>

type TextInputProps = {
  label?: JSXElement
  error?: JSXElement
  description?: JSXElement
  type?: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date'
} & InputProps &
  TextFieldProps &
  TextFieldInputProps

export const TextInput: Component<TextInputProps> = props => {
  const [inputProps, labelProps, descriptionProps, errorProps, rootProps] =
    splitProps(
      props,
      [
        'autofocus',
        'onBlur',
        'ref',
        'onFocus',
        'type',
        'autoCapitalize',
        'autocomplete',
        'autocorrect',
        'onInput'
      ],
      ['label'],
      ['description'],
      ['error']
    )

  return (
    <TextField
      {...rootProps}
      validationState={errorProps.error ? 'invalid' : 'valid'}
      class="flex flex-col gap-2"
    >
      <Show when={descriptionProps.description}>
        {description => (
          <TextField.Description
            as="span"
            class={statusMessageVariants({ class: 'order-3' })}
          >
            {description()}
          </TextField.Description>
        )}
      </Show>

      <TextField.Input
        {...inputProps}
        placeholder=" "
        class="peer font-secondary data-[invalid]:!border-b-error order-2 !border-b border-transparent !border-b-black/50 bg-transparent py-2 outline-none transition-colors focus:!border-b-black disabled:cursor-not-allowed disabled:opacity-50"
      />

      <Show when={labelProps.label}>
        {label => (
          <TextField.Label class="order-1 -mb-4 origin-left translate-y-[25px] self-start text-black/50 transition-transform peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:scale-75 peer-focus:translate-y-0 peer-focus:scale-75">
            {label()}
          </TextField.Label>
        )}
      </Show>

      <Show when={errorProps.error}>
        {error => (
          <TextField.ErrorMessage
            as="span"
            class={statusMessageVariants({
              variant: 'error',
              class: 'animate-reveal order-4'
            })}
          >
            {error()}
          </TextField.ErrorMessage>
        )}
      </Show>
    </TextField>
  )
}
