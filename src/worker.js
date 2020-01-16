import 'babel-polyfill';
import { workerMessageHandler } from './lib/asyncWorker';

const handlePing = data => `Handling ping: ${data}`;

const handlePong = data =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Handling pong: ${data}`), 1000);
  });

const actions = {
  ping: handlePing,
  pong: handlePong,
};

workerMessageHandler({ actions, self });
