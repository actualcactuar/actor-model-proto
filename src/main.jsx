import { h } from './plugins/jsx-dom';
import { component } from './jsx/elem';

document.body.append(
  <div>
    <button onclick={() => console.log('foo')}>click meh</button>
    <p>wat</p>
    {component()}
  </div>,
);
