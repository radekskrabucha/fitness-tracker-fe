import { NumberField } from '@kobalte/core/number-field'
import {
  Show,
  splitProps,
  type Component,
  type ComponentProps,
  type JSXElement
} from 'solid-js'
import { buttonVariants } from './Button'
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
  'autofocus' | 'onBlur' | 'ref' | 'placeholder'
>

type NumberInputWithStepsProps = NumberFieldProps &
  InputProps & {
    label?: JSXElement
    error?: JSXElement
    description?: JSXElement
  }

export const NumberInputWithSteps: Component<
  NumberInputWithStepsProps
> = props => {
  const [inputProps, labelProps, descriptionProps, errorProps, rootProps] =
    splitProps(
      props,
      ['placeholder', 'autofocus', 'ref', 'onBlur'],
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
      <Show when={labelProps.label}>
        {label => (
          <NumberField.Label class="self-start text-black/50">
            {label()}
          </NumberField.Label>
        )}
      </Show>
      <div class="flex gap-2">
        <NumberField.DecrementTrigger class={buttonVariants()}>
          -
        </NumberField.DecrementTrigger>
        <NumberField.Input
          placeholder={inputProps.placeholder}
          class="font-secondary flex-1 shrink rounded-md border-transparent bg-white px-4 py-2 text-sm font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <NumberField.IncrementTrigger class={buttonVariants()}>
          +
        </NumberField.IncrementTrigger>
      </div>
      <Show when={descriptionProps.description}>
        {description => (
          <NumberField.Description
            as="span"
            class={statusMessageVariants({ class: '-mt-2' })}
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
              class: 'animate-reveal'
            })}
          >
            {message()}
          </NumberField.ErrorMessage>
        )}
      </Show>
    </NumberField>
  )
}
