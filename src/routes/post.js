import { parseFragmentFromString } from '../lib/component';

export const resolve = async ({ id }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const json = await response.json();
  return json;
};

export const onRender = async ({ fragment, result }) => {
  const { title, body } = result;
  const str = () => `
    <div class="post__avatar">${title.split('')[0]}</div>
    <div class="post__content">
    <h4>${title}</h4>
    <p>${body}</p>
    </div>
    `;
  const tpl = parseFragmentFromString(str());

  console.log(result);

  fragment.querySelector('.modal').appendChild(tpl);
};

export const fragment = () => {
  const fragment = parseFragmentFromString(`
    <div class="modal">
        <div class="modal__toolbar">
            <router-link href="/posts">back</router-link>
        </div>
    </div>
  `);

  return fragment;
};
