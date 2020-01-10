console.log('worker');

const handlePing = data => `Here we are: ${data.token}`;

const actions = {
  ping: handlePing,
};

self.addEventListener('message', event => {
  const { data } = event;
  const { token, payload, action } = data;
  if (action in actions) {
    const result = actions[action].call(this, payload);
    postMessage({ token, result });
  }
});
