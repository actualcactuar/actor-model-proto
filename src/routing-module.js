import { createRouter } from './lib/router';
import { home, settings, profile, notFoundFragment } from './routes';

const routes = [
  { path: '/home', ...home },
  { path: '/profile', ...profile },
  {
    path: '/settings',
    ...settings,
  },
];
export const navigate = createRouter(routes, { notFoundFragment });
