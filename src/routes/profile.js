import { createFragment } from '../lib/router';

export const fragment = () => {
  const template = createFragment(`<h2 class="title">Profile</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores qui quia ipsa ad
      architecto, magnam eveniet voluptatum tempora animi voluptatibus corporis quod nemo eum
      pariatur! Consequatur voluptate dolorem sint impedit.
    </p>
    `);

  return template;
};

export const onRender = ({ params }) => {
  console.log('profile render', params);
};
