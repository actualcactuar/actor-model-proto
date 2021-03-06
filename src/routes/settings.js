import { parseFragmentFromString } from '../lib/component';

export const onRender = ({ fragment, result }) => {
  const p = document.createElement('p');
  p.innerHTML = `Resolved response was: ${result}`;
  fragment.appendChild(p);
};

export const fragment = () => {
  const fragment = parseFragmentFromString(`
    <h2 class="title">Settings</h2>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus officia aliquid fugit
      architecto quibusdam omnis quae quisquam inventore saepe perferendis. Perferendis voluptatem
      expedita ea blanditiis molestiae fuga, autem exercitationem delectus.
    </p>
  `);

  return fragment;
};
