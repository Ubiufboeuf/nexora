import type { Route } from './+types/worker'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export function loader ({ context, ...rest }: Route.LoaderArgs) {
  console.log({ context, rest }, context.cloudflare)
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE }
}

export default function Worker ({ loaderData }: Route.ComponentProps) {
  return <>msg: {loaderData?.message}</>
}
