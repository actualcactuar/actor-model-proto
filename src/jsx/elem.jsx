import { h } from '../plugins/jsx-dom';

export const component = () => {
  return (
    <div>
      <button onclick={() => console.log('component')}>component</button>
    </div>
  );
};
