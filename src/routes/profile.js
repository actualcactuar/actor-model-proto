import { createFragment } from '../lib/router';
import { worker } from '../worker-module';

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

console.log(worker);
export const resolve = async params => {
  const result = await worker.post({ action: 'pong', payload: params });
  console.log(result);
};

export const onRender = ({ params }) => {
  console.log('profile render', params);
};
