console.log('worker');

self.addEventListener('message', event => {
  const { data } = event;

  setTimeout(() => {
    postMessage(data);
  },data.timeout)
});
