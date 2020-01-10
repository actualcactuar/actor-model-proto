# actor-model-proto

small project to test out actor-model architecture

## AsyncWorker class

Class to initialize worker into wrapper that assings unique tokens to messages and wraps those in Promise.

1. Initialize instance of AsyncWorker class
2. send message to worker using `AsyncWorker.post()` function. Function returns a Promise with payload your worker function returns.

`action` and `payload` on `AsyncWorker.post({ action, post })` are fixed keynames and must be used

```
import { workerMessageHandler } from 'path/to/file';

const worker = new AsyncWorker('worker.js');

worker
.post({ action: 'foo', payload: '[FOO]' })
.then(result => console.log(result))
.catch(e => console.log(e));

```

## workerMessageHandler function

Function to use in sync with `AsyncWorker`, function takes in an object of functions and workers global `self` keyword.

Initialize message handler in worker file:

```
import { workerMessageHandler } from 'path/to/file';

const actions = {
  foo: () => 'foo',
  bar: () => 'bar'),
};

workerMessageHandler({ actions, self });
```

## Usage

Now when Main Thread sends `AsyncWorker.post({ action, payload })` it gets handled with `workerMessageHandler` which resolves to a Promise with values worker function returns.
