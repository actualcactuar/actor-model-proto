import { wait } from '../lib/utils';

export const resolve = wait;

export const onRender = ({ fragment, result }) => {
  const p = document.createElement('p');
  p.innerHTML = `Resolved response was: ${result}`;
  fragment.appendChild(p);
};
