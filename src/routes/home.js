import {createFragment} from '../lib/router';

export const resolve = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await response.json();
  return json;
};

export const onRender = async ({ fragment: route, result }) => {
  const tpl = ({ title, body }) => `
        <h4>${title}</h4>
        <p>${body}</p>`;

  const fragment = new DocumentFragment();
  result.forEach(post => {
    const div = document.createElement('div');
    div.classList.add('post');

    div.innerHTML = tpl(post);
    fragment.appendChild(div);
  });

  route.appendChild(fragment);
  console.log(result);
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
  
}