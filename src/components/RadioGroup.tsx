import { RadioGroup as KRadioGroup } from '@kobalte/core/radio-group'
import { For, Show, splitProps, type ComponentProps, type JSX } from 'solid-js'
import { statusMessageVariants } from './StatusMessage'

type RadioGroupRootProps = Pick<
  ComponentProps<typeof KRadioGroup>,
  'as' | 'id' | 'name' | 'required' | 'disabled' | 'readOnly' | 'orientation'
>

type RadioGroupProps<T extends string = string> = {
  label?: JSX.Element
  description?: JSX.Element
  error?: JSX.Element
  options: readonly T[]
  value: T | undefined
  defaultValue?: T
  onChange: ((value: T) => void) | undefined
  transformLabel?: (value: T) => string
} & RadioGroupRootProps

export function RadioGroup<T extends string = string>(
  props: RadioGroupProps<T>
) {
  const [labelProps, descriptionProps, errorProps, transformProps, rootProps] =
    splitProps(props, ['label'], ['description'], ['error'], ['transformLabel'])

  return (
    // @ts-expect-error - we use T as value that extend string e.g. string union
    <KRadioGroup
      {...rootProps}
      validationState={errorProps.error ? 'invalid' : 'valid'}
      class="flex flex-col gap-2"
    >
      <Show when={labelProps.label}>
        {label => (
          <KRadioGroup.Label class="self-start text-black/50">
            {label()}
          </KRadioGroup.Label>
        )}
      </Show>

      <div class="flex flex-row flex-wrap gap-4">
        <For each={props.options}>
          {option => (
            <KRadioGroup.Item value={option}>
              <KRadioGroup.ItemInput />
              <KRadioGroup.ItemLabel class="flex flex-1 shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2 capitalize shadow-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50">
                <KRadioGroup.ItemControl class="flex size-5 items-center justify-center rounded-full bg-black/10 p-1 transition-colors duration-100 data-[checked]:bg-black/15">
                  <KRadioGroup.ItemIndicator class="animate-show h-full w-full flex-1 shrink-0 rounded-full bg-black transition-colors duration-100" />
                </KRadioGroup.ItemControl>
                <Show
                  when={transformProps.transformLabel}
                  fallback={option}
                >
                  {transformLabel => (
                    <KRadioGroup.ItemDescription class="text-sm font-medium">
                      {transformLabel()(option)}
                    </KRadioGroup.ItemDescription>
                  )}
                </Show>
              </KRadioGroup.ItemLabel>
            </KRadioGroup.Item>
          )}
        </For>
      </div>

      <Show when={descriptionProps.description}>
        {description => (
          <KRadioGroup.Description
            as="span"
            class={statusMessageVariants({ class: '-mt-2' })}
          >
            {description()}
          </KRadioGroup.Description>
        )}
      </Show>
      <Show when={errorProps.error}>
        {message => (
          <KRadioGroup.ErrorMessage
            class={statusMessageVariants({
              variant: 'error',
              class: 'animate-reveal'
            })}
          >
            {message()}
          </KRadioGroup.ErrorMessage>
        )}
      </Show>
    </KRadioGroup>
  )
}
