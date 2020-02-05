import { parseFragment, dynamicFragment } from '../lib/component';

export const onRender = async ({ fragment, result, params, outlet }) => {
  console.log('render', { fragment, result, params, outlet });
};

export const fragment = () => {
  const fragment = parseFragment(`
    <h2 class="title">Home</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis illum minus cum consequuntur
      dicta obcaecati dolor eum ex, magnam porro! Vitae eum quibusdam at perspiciatis iure porro
      maiores similique labore!
    </p>
  `);

  const title = 'Fooo';
  const fn = () => 'baaar';
  const elem = dynamicFragment`<div>test component</div>`;
  const fragmentProto = dynamicFragment`<div><p>${title}</p><button>${fn}</button>${elem}</div>`;

  return fragment;
};
