import './style.scss';
import 'babel-polyfill';

import { AsyncWorker } from './lib/asyncWorker';

const worker = new AsyncWorker('worker.js');

document.querySelector('#ping').addEventListener('click', e => {
  worker
    .post({ action: 'pinfoog', payload: '[PING]' })
    .then(result => console.log(result, 'resolved'))
    .catch(e => console.log(e));
});

document.querySelector('#pong').addEventListener('click', e => {
  worker
    .post({ action: 'pong', payload: '[PONG]' })
    .then(result => console.log(result, 'resolved'))
    .catch(e => console.log(e));
});
