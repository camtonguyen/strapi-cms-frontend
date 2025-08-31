import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./routes/layouts/main.tsx', [
    index('./routes/home/index.tsx'),
    route(':slug', './routes/page/index.tsx'),
  ]),
] satisfies RouteConfig;
