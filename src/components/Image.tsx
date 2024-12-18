import { Image as ImageKobalte } from '@kobalte/core/image'
import type { ImageRootProps } from '@kobalte/core/image'
import { Show, type Component, type ComponentProps } from 'solid-js'

type ImgProps = Pick<
  ComponentProps<'img'>,
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
type WrapperSpanProps = Pick<
  ComponentProps<'span'>,
  'onClick' | 'id' | 'ref' | 'class' | 'classList'
>
type FallbackSpanProps = Pick<
  ComponentProps<'span'>,
  'class' | 'classList' | 'children'
>
type ImageProps = {
  wrapper?: ImageRootProps & WrapperSpanProps
  fallback?: FallbackSpanProps
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
