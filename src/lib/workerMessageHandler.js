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
