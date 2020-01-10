import './style.scss';
import 'babel-polyfill';

import { AsyncWorker } from './lib/asyncWorker';

const worker = new AsyncWorker('worker.js');
const drawer = document.querySelector('#drawer');

document.querySelector('#ping').addEventListener('click', e => {
  worker
    .post({ action: 'ping', payload: '[PING]' })
    .then(result => console.log(result, 'resolved'))
    .catch(e => console.log(e));
});

document.querySelector('#pong').addEventListener('click', e => {
  worker
    .post({ action: 'pong', payload: '[PONG]' })
    .then(result => console.log(result, 'resolved'))
    .catch(e => console.log(e));
});

document
  .querySelector('#menu-toggle')
  .addEventListener('click', () => drawer.classList.toggle('active'));
