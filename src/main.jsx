import { h } from './plugins/jsx-dom';

class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setTime() {
    const time = new Date();
    this.setAttribute('time', time);
  }

  render(state) {
    const { time } = state;
    this.shadowRoot.innerHTML = null;
    this.shadowRoot.append(
      <div>
        <p>JSX rendering for custom element</p>
        <span>{time}</span>
        <button onclick={() => this.setTime()}>click</button>
      </div>,
    );
  }

  connectedCallback() {
    this.render({ time: new Date() });
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('[PROTO] attributes changed.', { name, oldValue, newValue });
    this.render({ [name]: newValue });
  }

  static get observedAttributes() {
    return ['time'];
  }
}

window.customElements.define('c-element', MyCustomElement);
