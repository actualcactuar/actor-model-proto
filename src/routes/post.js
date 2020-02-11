import { parseFragmentFromString } from '../lib/component';

export const resolve = async ({ id }) => {
  const requestPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await requestPost.json();
  const requestAuthor = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  const author = await requestAuthor.json();
  const requestComments = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
  );
  const comments = await requestComments.json();
  return { post, author, comments };
};

export const onRender = async ({ fragment, result }) => {
  const { post, author, comments } = result;
  const str = ({ title, body, name }) => `
    <h2 class="title">Post by ${name}</h2>
    <div class="post__avatar">${title.split('')[0]}</div>
    <div class="post__content">
      <h4>${title}</h4>
      <p>${body}</p>
    </div>
    <router-link class="styled-router-link" href="/posts">Back</router-link>
    `;
  const tpl = parseFragmentFromString(str({ ...post, ...author }));

  const commentFeed = ({ body, name, email }) => `
    <div class="comment">
      <p>Comment</p>
      <p>${body}</p>
      <a href="mailto:${email}">Written by: ${email}</a>
    </div>
  `;

  const commentFeedFragment = parseFragmentFromString(comments.map(commentFeed).join(''));

  fragment.appendChild(tpl);
  fragment.appendChild(commentFeedFragment);
};

export const fragment = () => parseFragmentFromString();
