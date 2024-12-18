import { Show, type JSXElement, type Component } from 'solid-js'

type AttributeBadgeProps = {
  icon: JSXElement
  label: JSXElement
  value: JSXElement
  unit?: JSXElement
  shouldExpand?: boolean
}

export const AttributeBadge: Component<AttributeBadgeProps> = props => (
  <div
    class="flex shrink-0 items-center gap-4 rounded-lg bg-white px-4 py-2 shadow-sm max-sm:flex-1"
    classList={{
      'flex-1': props.shouldExpand
    }}
  >
    {props.icon}
    <div class="flex flex-col">
      <span class="text-sm whitespace-nowrap text-black/50">{props.label}</span>
      <h3 class="text-xl font-bold whitespace-nowrap text-black/80">
        {props.value}
        <Show when={props.unit}>
          {unit => <span class="text-sm text-black/50"> {unit()}</span>}
        </Show>
      </h3>
    </div>
  </div>
)
