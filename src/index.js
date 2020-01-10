import './style.scss';
import 'babel-polyfill';

import { generateToken } from './lib/utils';
import { AsyncWorker } from './lib/asyncWorker';

const worker = new AsyncWorker('worker.js', { module: true });

document.querySelector('#btn').addEventListener('click', e => {
  worker
    .post({ data: generateToken(), timeout: Math.round(Math.random() * 1000) })
    .then(({ data }) => console.log(data, 'resolved'))
    .catch(e => console.log(e));
});
