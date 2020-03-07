import { parseFragmentFromString, useTemplateAsFragment } from '../lib/component';
import { useState } from '../lib/state';

export const onRender = async ({ fragment, result, params, outlet }) => {
  console.log('render', { fragment, result, params, outlet });
};

export const fragment = () => {
  const time = new Date();
  const [setTime, subscribeToTimeChange] = useState(time);

  const fragment = parseFragmentFromString(`
    <h2 class="title">Home</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis illum minus cum consequuntur
      dicta obcaecati dolor eum ex, magnam porro! Vitae eum quibusdam at perspiciatis iure porro
      maiores similique labore!
    </p>
    <p id="timeTarget">${time}</p>
  `);

  const handleClick = () => {
    const time = new Date();
    setTime(time);
  };

  subscribeToTimeChange(value => {
    document.querySelector('#timeTarget').innerText = value;
  });

  const button = document.createElement('button');
  button.innerText = 'set time!';
  button.addEventListener('click', handleClick);

  fragment.appendChild(button);

  return fragment;
};
