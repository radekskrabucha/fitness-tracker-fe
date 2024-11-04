import { isHydrated } from '@solid-primitives/lifecycle'
import { createMemo, type FlowComponent } from 'solid-js'

// This component will only render its children on the client
export const ClientOnly: FlowComponent = props => {
  const children = createMemo(() => isHydrated() && props.children)
  return <>{children()}</>
}
