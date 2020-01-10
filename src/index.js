import './style.scss';
import 'babel-polyfill';

import { generateToken } from './lib/utils';
import { AsyncWorker } from './lib/asyncWorker';

const worker = new AsyncWorker('worker.js', { module: true });

document.querySelector('#btn').addEventListener('click', e => {
  worker
    .post({ action: 'ping', payload: { token: generateToken() } })
    .then(result => console.log(result, 'resolved'))
    .catch(e => console.log(e));
});
