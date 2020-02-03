import { createRouter } from './lib/router';
import { home, settings, profile, notFound, posts } from './routes';

const routes = [
  { path: '/home', ...home },
  { path: '/profile', ...profile },
  { path: '/posts', ...posts },
  { path: '/profile/:id', ...posts },
  {
    path: '/settings',
    ...settings,
  },
];

const container = document.querySelector('#router-outlet-container');

const onNavigationStart = state => {
  container.classList.add('route-loading');
  console.log({ ...state });
};
const onNavigationEnd = state => {
  container.classList.remove('route-loading');
  console.log({ ...state });
};
const routerConfig = { notFound, onNavigationEnd, onNavigationStart };
export const navigate = createRouter(routes, routerConfig);
