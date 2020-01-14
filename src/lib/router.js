export class Router {
  constructor(routes) {
    this.routes = routes;
    this.views = document.querySelector('#views');
    this.links = document.querySelectorAll('a[view-link]');
    this.notfoundView = views.querySelector('#notfound');

    window.addEventListener('popstate', ({ state }) => {
      this.render({ identifier: state, path: location.pathname + location.search });
    });
  }

  render({ identifier, path }) {
    // deactivate currently active views and links
    const activeView = this.views.querySelector('.active');
    if (activeView) {
      activeView.classList.remove('active');
    }

    this.links.forEach(link => link.classList.remove('active'));

    // active currently matching links
    const linksToActivate = document.querySelectorAll(`a[view-link][href="${path}"]`);
    linksToActivate.forEach(link => link.classList.add('active'));

    // activate correct view
    const view = this.views.querySelector(`#${identifier}`);
    if (view) {
      view.classList.add('active');
    } else {
      this.notfoundView.classList.add('active');
    }
  }

  navigate(pathToRoute) {
    const route = this.routes.find(({ path }) => path === pathToRoute);
    if (route) {
      const { identifier, path } = route;
      history.pushState(identifier, null, path);
      this.render({ identifier, path });
      return;
    }

    this.render({ identifier: 'notfound', path: pathToRoute });
  }

  async init() {
    const setRouterLinks = link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigate(url);
      });
    };

    const {
      history,
      location: { pathname, search },
    } = window;
    if (history.state) {
      this.render({ path: pathname + search, identifier: history.state });
    } else {
      this.navigate('/home');
    }

    this.links.forEach(setRouterLinks);
  }
}
