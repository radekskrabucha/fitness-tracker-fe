import {
  Show,
  type Component,
  type FlowComponent,
  type JSXElement
} from 'solid-js'
import { Card } from './Card'
import { Icon } from './Icon'
import { Link } from './Link'

type ModalPageProps = {
  href: string
  title: JSXElement
  description?: JSXElement
  icon?: JSXElement
}

export const ModalPage: FlowComponent<ModalPageProps> = props => (
  <>
    <Link
      href={props.href}
      replace
      class="animate-show bg-background/10 fixed inset-0 backdrop-blur-sm"
    />
    <Card class="animate-show fixed top-[50%] left-[50%] z-20 h-[min(80vh,var(--width-xl))] w-[min(calc(100vw-48px),var(--width-3xl))] translate-x-[-50%] translate-y-[-50%] overflow-hidden p-0">
      <div class="flex flex-col gap-4 bg-white/50 px-6 py-8">
        <div class="flex items-center justify-between gap-2">
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
        <Show when={props.description}>
          {description => (
            <p class="line-clamp-3 text-current/50">{description()}</p>
          )}
        </Show>
      </div>
      <div class="flex flex-1 flex-col gap-6 overflow-auto px-6 py-10">
        {props.children}
      </div>
    </Card>
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
      icon="close"
      class="size-4 fill-current transition-colors duration-150"
    />
  </Link>
)
