import { Image } from '~/components/Image'

export const Background = () => (
  <Image
    img={{
      src: '/images/background/1.jpg',
      class: 'fixed inset-0 min-h-full h-auto w-screen object-cover -z-10'
    }}
  />
)
