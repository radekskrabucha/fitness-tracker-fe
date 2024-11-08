import {
  Show,
  type Component,
  type FlowComponent,
  type JSXElement
} from 'solid-js'
import { Icon } from './Icon'
import { Link } from './Link'

type ModalPageProps = {
  href: string
  title: string
  icon?: JSXElement
}

export const ModalPage: FlowComponent<ModalPageProps> = props => (
  <>
    <Link
      href={props.href}
      replace
      class="show bg-background/10 fixed inset-0 backdrop-blur-sm"
    />
    <div class="show card fixed top-[50%] left-[50%] z-10 flex h-[min(80vh,var(--width-lg))] w-[min(calc(100vw-48px),var(--width-3xl))] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden">
      <div class="flex items-center justify-between gap-2 bg-white/50 px-6 py-8">
        <h2 class="line-clamp-2 text-3xl font-bold capitalize">
          {props.title}
        </h2>
        <Show
          when={props.icon}
          fallback={<DefaultIcon href={props.href} />}
        >
          {props.icon}
        </Show>
      </div>
      <div class="flex flex-1 flex-col gap-6 overflow-auto px-6 py-10">
        {props.children}
      </div>
    </div>
  </>
)

type DefaultIconProps = Pick<ModalPageProps, 'href'>

const DefaultIcon: Component<DefaultIconProps> = props => (
  <Link
    href={props.href}
    replace
    class="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/20 hover:text-current/50"
  >
    <Icon
      id="close"
      class="size-4 fill-current transition-colors duration-150"
    />
  </Link>
)
