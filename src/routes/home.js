import { createFragment } from '../lib/router';

// export const resolve = async () => {
//   console.log('resolve');
// };

export const onRender = async ({ fragment: route, result }) => {
  console.log('render');
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
