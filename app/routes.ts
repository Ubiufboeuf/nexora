import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/watch', 'routes/watch.tsx'),
  route('/worker', 'routes/worker.tsx')
] satisfies RouteConfig
