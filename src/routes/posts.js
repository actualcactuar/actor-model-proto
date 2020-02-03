import { createFragment } from '../lib/router';

export const resolve = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await response.json();
  return json;
};

export const onRender = async ({ fragment: route, result }) => {
  const tpl = ({ title, body }) => `
  <div class="post__avatar">${title.split('')[0]}</div>
  <div class="post__content">
    <h4>${title}</h4>
    <p>${body}</p>
  </div>
  `;

  const fragment = new DocumentFragment();
  result.forEach(post => {
    const div = document.createElement('div');
    div.classList.add('post');

    div.innerHTML = tpl(post);
    fragment.appendChild(div);
  });

  route.appendChild(fragment);
};

export const fragment = () => {
  const fragment = createFragment(`
    <h2 class="title">Posts</h2>   
  `);

  return fragment;
};
