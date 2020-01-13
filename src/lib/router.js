export class Router {
  constructor() {
    this.views = document.querySelector('#views');
    this.links = document.querySelectorAll('a[view-link]');
    this.notfoundView = views.querySelector('#notfound');

    window.addEventListener('popstate', ({ state }) => {
      this.navigate(state);
    });
  }

  navigate(viewId) {
    const activeView = this.views.querySelector('.active');
    if (activeView) {
      activeView.classList.remove('active');
    }

    this.links.forEach(link => link.classList.remove('active'));

    const activeLinks = document.querySelectorAll(`a[view-link][view="${viewId}"]`);
    activeLinks.forEach(link => link.classList.add('active'));

    const view = this.views.querySelector(`#${viewId}`);
    if (view) {
      view.classList.add('active');
    } else {
      this.notfoundView.classList.add('active');
    }
  }

  async init() {
    const setRouterLinks = link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const url = link.getAttribute('href');
        const viewId = link.getAttribute('view');
        history.pushState(viewId, null, url);
        this.navigate(viewId);
      });
    };

    const { history } = window;
    if (history.state) {
      this.navigate(history.state);
    } else {
      history.pushState('home', null, '/home');
      this.navigate('home');
    }

    this.links.forEach(setRouterLinks);
  }
}
