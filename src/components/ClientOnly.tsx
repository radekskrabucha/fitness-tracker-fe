import { isHydrated } from '@solid-primitives/lifecycle'
import { createMemo, type FlowComponent, type JSX } from 'solid-js'

type ClientOnlyProps = {
  serverFallbackPlaceholder?: JSX.Element
}

// This component will only render its children on the client
// with possible fallback component, useful to avoid layout shifts
export const ClientOnly: FlowComponent<ClientOnlyProps> = props => {
  const children = createMemo(() =>
    isHydrated() ? props.children : props.serverFallbackPlaceholder
  )

  return <>{children()}</>
}
