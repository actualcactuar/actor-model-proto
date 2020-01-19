import './style.scss';
import 'babel-polyfill';

import { AsyncWorker } from './lib/asyncWorker';
import { navigate } from './routing-module';

console.log('init');

const worker = new AsyncWorker('worker.js');
