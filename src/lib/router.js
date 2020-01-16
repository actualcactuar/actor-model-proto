export class Router {
  constructor(routes) {
    this.routes = routes;
    this.outlet = document.querySelector('#router-outlet');
    this.links = document.querySelectorAll('a[view-link]');
    this.notfoundView = document.querySelector('#notfound').content.cloneNode(true);

    window.addEventListener('popstate', ({ state }) => {
      this.render({ identifier: state, path: location.pathname + location.search });
    });
  }

  render({ identifier, path }) {
    this.outlet.innerHTML = null;
    this.links.forEach(link => link.classList.remove('active'));

    // active currently matching links
    const linksToActivate = document.querySelectorAll(`a[view-link][href="${path}"]`);
    linksToActivate.forEach(link => link.classList.add('active'));
    // activate correct view
    const view = document.querySelector(`#${identifier}`);

    if (view) {
      const clone = view.content.cloneNode(true);
      this.outlet.appendChild(clone);
    } else {
      this.outlet.appendChild(this.notfoundView);
    }
  }

  navigate({ pathname, search }) {
    const route = this.routes.find(({ path }) => path === pathname);
    const fullPath = search ? pathname + search : pathname;
    if (route) {
      const { identifier, path } = route;
      history.pushState(identifier, null, fullPath);
      this.render({ identifier, path });
      return;
    }

    this.render({ identifier: 'notfound', path: fullPath });
  }

  async init() {
    const setRouterLinks = link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const pathname = link.getAttribute('href');
        const search = link.getAttribute('search');
        this.navigate({ pathname, search });
      });
    };

    const {
      history,
      location: { pathname, search },
    } = window;
    if (pathname) {
      this.navigate({ pathname, search });
    } else {
      this.navigate({ pathname: '/home' });
    }

    this.links.forEach(setRouterLinks);
  }
}
