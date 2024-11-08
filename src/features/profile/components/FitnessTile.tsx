import { Show, type Component, type JSXElement } from 'solid-js'

type FitnessTileProps = {
  label: JSXElement
  value: JSXElement
  icon: JSXElement
  unit?: JSXElement
}

export const FitnessTile: Component<FitnessTileProps> = props => (
  <div class="flex flex-1 shrink-0 items-center gap-6 rounded-2xl bg-white px-8 py-3 shadow-sm">
    {props.icon}
    <div class="flex flex-col">
      <span class="text-sm text-black/50">{props.label}</span>
      <h3 class="text-xl font-bold whitespace-nowrap text-black/80">
        {props.value}
        <Show when={props.unit}>
          {unit => <span class="text-sm text-black/50"> {unit()}</span>}
        </Show>
      </h3>
    </div>
  </div>
)
