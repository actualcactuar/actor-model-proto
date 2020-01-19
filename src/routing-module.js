import { createRouter, defineRouterLink } from './lib/router';
import { wait } from './lib/utils';

const routes = [
  { path: '/home', identifier: 'home' },
  { path: '/profile', identifier: 'profile' },
  {
    path: '/settings',
    identifier: 'settings',
    resolve: wait,
    onRender: ({ routeFragment, resolverResponse }) => {
      const p = document.createElement('p');
      p.innerHTML = `Resolved response was: ${resolverResponse}`;
      routeFragment.appendChild(p);
    },
  },
];
export const { navigate } = createRouter(routes);
