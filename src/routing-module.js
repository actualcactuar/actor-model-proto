import { createRouter, useTemplate } from './lib/router';
import { home, settings, profile, notFoundFragment } from './routes';

const routes = [
  { path: '/home', ...home },
  { path: '/profile', ...profile },
  {
    path: '/settings',
    ...settings,
  },
  {
    path: '/test',
    fragment: () => useTemplate('test'),
  },
];
export const navigate = createRouter(routes, { notFoundFragment });
