import { createRouter } from './lib/router';

import { home, settings } from './routes';
const routes = [
  { path: '/home', identifier: 'home', ...home },
  { path: '/profile', identifier: 'profile' },
  {
    path: '/settings',
    identifier: 'settings',
    ...settings,
  },
];
export const navigate = createRouter(routes);
