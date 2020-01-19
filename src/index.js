import './style.scss';
import 'babel-polyfill';

import { AsyncWorker } from './lib/asyncWorker';
import { createRouter, defineRouterLink } from './lib/router';
import { wait } from './lib/utils';

console.log('init');

const worker = new AsyncWorker('worker.js');
const routes = [
  { path: '/home', identifier: 'home' },
  { path: '/profile', identifier: 'profile' },
  {
    path: '/settings',
    identifier: 'settings',
    resolve: wait,
    onRender: ({ outletRef, resolverResponse }) => {
      const p = document.createElement('p');
      p.innerHTML = `Resolved response was: ${resolverResponse}`;
      outletRef.appendChild(p);
    },
  },
];
const { navigate } = createRouter(routes);
defineRouterLink(navigate);
