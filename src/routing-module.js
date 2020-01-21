import { createRouter, useTemplate } from './lib/router';
import { home, settings, profile, notFound } from './routes';

const { fragment: notFoundFragment } = notFound;
const testFragment = () => useTemplate('test');

const routes = [
  { path: '/home', ...home },
  { path: '/profile', ...profile },
  { path: '/profile/:id', ...profile },
  {
    path: '/settings',
    ...settings,
  },
  {
    path: '/test/:id/:title',
    fragment: testFragment,
  },
];
export const navigate = createRouter(routes, { notFoundFragment });
