import './style.scss';
import 'babel-polyfill';

import { AsyncWorker } from './lib/asyncWorker';
import { Router } from './lib/router';

const worker = new AsyncWorker('worker.js');
const router = new Router();
router.init();
