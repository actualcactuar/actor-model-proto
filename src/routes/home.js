import { createFragment } from '../lib/router';

function Component() {}

Component.prototype.foo = function() {
  return 'goo';
};

export const onRender = async ({ fragment, result, params, outlet }) => {
  console.log('render', { fragment, result, params, outlet });
  const test = new Component();
  console.log(Component.foo);
};

export const fragment = () => {
  const fragment = createFragment(`
    <h2 class="title">Home</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis illum minus cum consequuntur
      dicta obcaecati dolor eum ex, magnam porro! Vitae eum quibusdam at perspiciatis iure porro
      maiores similique labore!
    </p>
  `);

  return fragment;
};
