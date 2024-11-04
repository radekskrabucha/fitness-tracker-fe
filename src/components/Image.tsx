import { Image as ImageKobalte } from '@kobalte/core/image'
import type { ImageRootProps } from '@kobalte/core/image'
import { Show, type Component, type JSX } from 'solid-js'

type ImgProps = Pick<
  JSX.ImgHTMLAttributes<HTMLImageElement>,
  | 'alt'
  | 'class'
  | 'width'
  | 'height'
  | 'loading'
  | 'decoding'
  | 'crossorigin'
  | 'elementtiming'
  | 'fetchpriority'
  | 'referrerpolicy'
  | 'sizes'
  | 'srcset'
  | 'src'
>

type ImageProps = {
  wrapper?: ImageRootProps & {
    class?: string
    onClick?: JSX.EventHandlerUnion<
      HTMLSpanElement,
      MouseEvent,
      JSX.EventHandler<HTMLSpanElement, MouseEvent>
    >
  }
  fallback?: {
    class: string
    children?: JSX.Element
  }
  img: ImgProps
}

export const Image: Component<ImageProps> = props => (
  <ImageKobalte {...props.wrapper}>
    <ImageKobalte.Img
      {...props.img}
      decoding={props.img.decoding || 'async'}
      loading={props.img.loading || 'lazy'}
    />
    <Show when={props.fallback}>
      {fallbackProps => <ImageKobalte.Fallback {...fallbackProps()} />}
    </Show>
  </ImageKobalte>
)
