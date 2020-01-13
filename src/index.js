import './style.scss';
import 'babel-polyfill';

import { AsyncWorker } from './lib/asyncWorker';

const worker = new AsyncWorker('worker.js');

const views = document.querySelector('#views');
const tabs = document.querySelector('#tabs');
const notfoundView = views.querySelector('#notfound');

const handleHashChange = async hash => {
  const activeView = views.querySelector('.active');
  if (activeView) {
    activeView.classList.remove('active');
  }
  const activeLink = tabs.querySelector('.active');
  if (activeLink) {
    activeLink.classList.remove('active');
  }

  const view = views.querySelector(hash);
  const link = tabs.querySelector(`[href="${hash}"]`);
  if (link) {
    link.classList.add('active');
  }

  if (view) {
    view.classList.add('active');
  } else {
    notfoundView.classList.add('active');
  }
};

window.addEventListener('popstate', ({ state }) => {
  handleHashChange(state);
});

const setRouterLinks = link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const hash = link.getAttribute('href');
    history.pushState(hash, null, hash);
    handleHashChange(hash);
  });
};

const init = async () => {
  const { location } = window;
  if (!location.hash) {
    handleHashChange('#home');
  } else {
    handleHashChange(location.hash);
  }

  const links = document.querySelectorAll('a[view-link]');
  links.forEach(setRouterLinks);
};

init();
