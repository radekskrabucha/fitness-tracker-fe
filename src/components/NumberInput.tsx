import { NumberField } from '@kobalte/core/number-field'
import {
  Show,
  splitProps,
  type Component,
  type ComponentProps,
  type JSXElement
} from 'solid-js'
import { statusMessageVariants } from './StatusMessage'

type NumberFieldProps = Pick<
  ComponentProps<typeof NumberField>,
  | 'as'
  | 'minValue'
  | 'maxValue'
  | 'step'
  | 'largeStep'
  | 'changeOnWheel'
  | 'format'
  | 'formatOptions'
  | 'allowedInput'
  | 'id'
  | 'name'
  | 'required'
  | 'disabled'
  | 'readOnly'
  | 'value'
  | 'onChange'
>
type InputProps = Pick<
  ComponentProps<'input'>,
  'ref' | 'onBlur' | 'onFocus' | 'autofocus'
>

type NumberInputProps = NumberFieldProps &
  InputProps & {
    label?: JSXElement
    error?: JSXElement
    description?: JSXElement
  }

export const NumberInput: Component<NumberInputProps> = props => {
  const [inputProps, labelProps, descriptionProps, errorProps, rootProps] =
    splitProps(
      props,
      ['autofocus', 'ref', 'onBlur', 'onFocus'],
      ['label'],
      ['description'],
      ['error']
    )

  return (
    <NumberField
      {...rootProps}
      validationState={props.error ? 'invalid' : 'valid'}
      class="flex flex-col items-stretch gap-2"
    >
      <NumberField.Input
        {...inputProps}
        placeholder=" "
        class="peer font-secondary data-[invalid]:!border-b-error order-2 !border-b border-transparent !border-b-black/50 bg-transparent py-2 outline-none transition-colors focus:!border-b-black disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Show when={labelProps.label}>
        {label => (
          <NumberField.Label class="order-1 -mb-4 origin-left translate-y-[25px] self-start text-black/50 transition-transform peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:scale-75 peer-focus:translate-y-0 peer-focus:scale-75">
            {label()}
          </NumberField.Label>
        )}
      </Show>
      <Show when={descriptionProps.description}>
        {description => (
          <NumberField.Description
            as="span"
            class={statusMessageVariants({ class: 'order-3 -mt-2' })}
          >
            {description()}
          </NumberField.Description>
        )}
      </Show>
      <Show when={errorProps.error}>
        {message => (
          <NumberField.ErrorMessage
            class={statusMessageVariants({
              variant: 'error',
              class: 'animate-reveal order-4'
            })}
          >
            {message()}
          </NumberField.ErrorMessage>
        )}
      </Show>
    </NumberField>
  )
}
