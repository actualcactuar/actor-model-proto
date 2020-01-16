import './style.scss';
import 'babel-polyfill';

import { AsyncWorker } from './lib/asyncWorker';
import { Router } from './lib/router';
import { wait } from './lib/utils';

console.log('init');

const worker = new AsyncWorker('worker.js');
const routes = [
  { path: '/home', identifier: 'home' },
  { path: '/profile', identifier: 'profile' },
  { path: '/settings', identifier: 'settings', resolve: wait },
];
const router = new Router(routes);
router.init();
