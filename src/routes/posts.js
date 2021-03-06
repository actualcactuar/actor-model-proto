import { parseFragmentFromString } from '../lib/component';

export const resolve = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await response.json();
  return json;
};

export const onRender = async ({ fragment: route, result }) => {
  const tpl = ({ title, body, id }) => `
  <router-link href="/posts/${id}">
    <div class="post__avatar">${title.split('')[0]}</div>
    <div class="post__content">
      <h4>${title}</h4>
      <p>${body}</p>
    </div>
  </router-link>
  `;

  const fragment = new DocumentFragment();
  result.forEach(post => {
    const div = document.createElement('div');
    div.classList.add('post');

    div.innerHTML = tpl(post);
    fragment.appendChild(div);
  });

  route.querySelector('.posts').appendChild(fragment);
};

export const fragment = () => {
  const fragment = parseFragmentFromString(`
    <h2 class="title">Posts</h2>
    <div class="posts"></div>
  `);

  return fragment;
};
