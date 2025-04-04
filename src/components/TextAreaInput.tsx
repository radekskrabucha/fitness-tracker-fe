import { TextField } from '@kobalte/core/text-field'
import {
  Show,
  splitProps,
  type Component,
  type ComponentProps,
  type JSXElement
} from 'solid-js'
import { statusMessageVariants } from './StatusMessage'

type TextAreaElementProps = Pick<
  ComponentProps<'textarea'>,
  | 'ref'
  | 'onBlur'
  | 'onFocus'
  | 'autofocus'
  | 'autoCapitalize'
  | 'autocomplete'
  | 'rows'
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
  | 'onChange'
>
type TextFieldTextAreaProps = Pick<
  ComponentProps<typeof TextField.TextArea>,
  'onInput' | 'autoResize' | 'submitOnEnter'
>

type TextAreaProps = {
  label?: JSXElement
  error?: JSXElement
  description?: JSXElement
} & TextAreaElementProps &
  TextFieldProps &
  TextFieldTextAreaProps

export const TextAreaInput: Component<TextAreaProps> = props => {
  const [textAreaProps, localProps, rootProps] = splitProps(
    props,
    [
      'autofocus',
      'onBlur',
      'ref',
      'onFocus',
      'autoCapitalize',
      'autocomplete',
      'onInput',
      'autoResize',
      'submitOnEnter',
      'rows'
    ],
    ['label', 'description', 'error']
  )

  return (
    <TextField
      {...rootProps}
      validationState={localProps.error ? 'invalid' : 'valid'}
      class="flex flex-col gap-2"
    >
      <Show when={localProps.description}>
        {description => (
          <TextField.Description
            as="span"
            class={statusMessageVariants({ class: 'order-3' })}
          >
            {description()}
          </TextField.Description>
        )}
      </Show>

      <TextField.TextArea
        {...textAreaProps}
        placeholder=" "
        class="peer data-[invalid]:!border-b-error font-secondary order-2 !border-b border-transparent !border-b-black/50 bg-transparent py-2 transition-colors outline-none focus:!border-b-black disabled:cursor-not-allowed disabled:opacity-50"
      />

      <Show when={localProps.label}>
        {label => (
          <TextField.Label class="order-1 -mb-4 origin-left translate-y-[25px] self-start text-black/50 transition-transform peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:scale-75 peer-focus:translate-y-0 peer-focus:scale-75">
            {label()}
          </TextField.Label>
        )}
      </Show>

      <Show when={localProps.error}>
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
