import { createRouter } from './lib/router';
import { home, settings, profile, notFound } from './routes';

const routes = [
  { path: '/home', ...home },
  { path: '/profile', ...profile },
  { path: '/profile/:id', ...profile },
  {
    path: '/settings',
    ...settings,
  },
];
export const navigate = createRouter(routes, { notFound });
