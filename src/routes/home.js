import { parseFragmentFromString, useTemplateAsFragment } from '../lib/component';

export const onRender = async ({ fragment, result, params, outlet }) => {
  console.log('render', { fragment, result, params, outlet });
};

export const fragment = () => {
  const fragment = parseFragmentFromString(`
    <h2 class="title">Home</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis illum minus cum consequuntur
      dicta obcaecati dolor eum ex, magnam porro! Vitae eum quibusdam at perspiciatis iure porro
      maiores similique labore!
    </p>
  `);

  const foo = useTemplateAsFragment('foo');
  fragment.appendChild(foo);

  return fragment;
};
