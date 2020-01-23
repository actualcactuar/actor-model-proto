import { createFragment } from '../lib/router';

export const fragment = () =>
  createFragment(`
  <h2 class="title">404 - page not found</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde sit nam odit nesciunt
        recusandae libero animi est dolor illo possimus, iure laborum eligendi autem, quas vitae,
        suscipit ipsam magni commodi!
      </p>
  `);
