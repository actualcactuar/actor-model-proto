export const useState = initialValue => {
  let value = initialValue;
  let subsciptions = [];
  const setter = attr => {
    subsciptions.forEach(callback => callback(value));
    value = typeof attr !== 'function' ? (value = attr) : attr(value);
  };

  const subscribe = callback => subsciptions.push(callback);
  const unsubscribe = callback =>
    (subsciptions = subsciptions.filter(subscription => subscription !== callback));

  return [setter, subscribe, unsubscribe];
};

function renderTemplateString(arr, args) {
  console.log({ arr, args });
}

renderTemplateString`
  <button onclick="${() => console.log('foo')}">click</button>
`;
