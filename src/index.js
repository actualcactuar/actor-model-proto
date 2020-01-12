import './style.scss';
import 'babel-polyfill';

import { AsyncWorker } from './lib/asyncWorker';

const worker = new AsyncWorker('worker.js');

const views = document.querySelector('#views');
const tabs = document.querySelector('#tabs');
const notfoundView = views.querySelector('#notfound');

const handleHashChange = async () => {
  const {
    location: { hash },
  } = window;
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

  console.log(views.scrollWidth);
  if (view) {
    view.classList.add('active');
  } else {
    notfoundView.classList.add('active');
  }
};

window.addEventListener('hashchange', handleHashChange);

const init = async () => {
  const { location } = window;
  if (!location.hash) {
    location.hash = '#home';
  } else {
    handleHashChange();
  }
};

init();
