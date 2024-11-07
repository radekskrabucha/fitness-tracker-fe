import type { FlowComponent } from 'solid-js'
import { Icon } from './Icon'
import { Link } from './Link'

type ModalPageProps = {
  href: string
  title: string
}

export const ModalPage: FlowComponent<ModalPageProps> = props => (
  <>
    <Link
      href={props.href}
      class="show bg-background/10 fixed inset-0 backdrop-blur-sm"
    />
    <div class="show fixed top-[50%] left-[50%] flex h-[min(80vh,var(--width-lg))] w-[min(calc(100vw-48px),var(--width-3xl))] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-3xl border border-white shadow-lg backdrop-blur-md">
      <div class="flex items-center justify-between gap-2 bg-white/50 px-6 py-8">
        <h2 class="line-clamp-2 text-3xl font-bold capitalize">
          {props.title}
        </h2>
        <Link
          href={props.href}
          class="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/20 hover:text-current/50"
        >
          <Icon
            id="close"
            class="size-4 fill-current transition-colors duration-150"
          />
        </Link>
      </div>
      <div class="flex flex-1 flex-col gap-6 overflow-auto px-6 py-10">
        {props.children}
      </div>
    </div>
  </>
)
