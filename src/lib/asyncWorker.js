import { generateToken } from './utils';

export class AsyncWorker {
  constructor(workerPath) {
    this.worker = new Worker(workerPath, { module: true });
  }

  post(params) {
    return new Promise((resolve, reject) => {
      const token = generateToken();
      this.worker.postMessage({ token, ...params });

      const handleMessage = ({ data }) => {
        if (data.token === token) {
          this.worker.removeEventListener('message', handleMessage);
          this.worker.removeEventListener('error', handleError);
          return resolve(data);
        }
      };

      const handleError = error => {
        this.worker.removeEventListener('message', handleMessage);
        this.worker.removeEventListener('error', handleError);
        return reject(error);
      };

      this.worker.addEventListener('message', handleMessage);
      this.worker.addEventListener('error', handleError);
    });
  }
}

export const workerMessageHandler = ({ actions, self }) => {
  const handleMessageAsync = async event => {
    const { data } = event;
    const { token, payload, action } = data;
    if (action in actions) {
      const result = await actions[action].call(this, payload);
      return postMessage({ token, result });
    }

    throw new Error(`Action "${action}" not recognized`);
  };

  self.addEventListener('message', handleMessageAsync);
};
