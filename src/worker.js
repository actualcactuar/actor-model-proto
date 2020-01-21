import 'babel-polyfill';
import { workerMessageHandler } from './lib/asyncWorker';

const handlePing = data => data;

const handlePong = data =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 1000);
  });

const actions = {
  ping: handlePing,
  pong: handlePong,
};

workerMessageHandler({ actions, self });
