import { createRouter } from './lib/router';
import { home, settings, profile, notFound, posts, post } from './routes';

const routes = [
  { path: '/home', ...home },
  { path: '/profile', ...profile },
  { path: '/posts', ...posts },
  { path: '/posts/:id', ...post, modifyExisting: true },
  {
    path: '/settings',
    ...settings,
  },
];

const container = document.querySelector('#router-outlet-container');

const onNavigationStart = state => {
  container.classList.add('route-loading');
};
const onNavigationEnd = state => {
  container.classList.remove('route-loading');
};
const routerConfig = { notFound, onNavigationEnd, onNavigationStart };

export const navigate = createRouter(routes, routerConfig);
