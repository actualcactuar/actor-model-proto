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
