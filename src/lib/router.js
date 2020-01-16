export class Router {
  constructor(routes) {
    this.routes = routes;
    this.container = document.querySelector('#router-outlet-container');
    this.outlet = document.querySelector('#router-outlet');
    this.links = document.querySelectorAll('a[view-link]');
    this.notfoundView = document.querySelector('#notfound').content.cloneNode(true);

    window.addEventListener('popstate', ({ state }) => {
      this.render({ identifier: state, path: location.pathname + location.search });
    });
  }

  async render({ identifier, resolve, onRender }) {
    this.outlet.innerHTML = null;

    // activate correct view
    const view = document.querySelector(`#${identifier}`);
    const clone = view ? view.content.cloneNode(true) : this.notfoundView;
    this.outlet.appendChild(clone);

    const resolverResponse = resolve ? await resolve() : null;

    if (onRender) {
      onRender({ resolverResponse, outletRef: this.outlet });
    }
    setTimeout(() => this.container.classList.remove('route-loading'), 200);
  }

  navigate({ pathname, search }) {
    const route = this.routes.find(({ path }) => path === pathname);
    const fullPath = search ? pathname + search : pathname;
    this.container.classList.add('route-loading');
    setTimeout(() => {
      if (route) {
        const { identifier, resolve, onRender } = route;
        history.pushState(identifier, null, fullPath);
        this.render({ identifier, resolve, onRender });
        return;
      }

      this.render({ identifier: 'notfound', path: fullPath });
    }, 200);
  }

  async init() {
    const handleLinkClick = ({ event, link }) => {
      event.preventDefault();

      const pathname = link.getAttribute('href');
      const search = link.getAttribute('search');

      this.links.forEach(link => link.classList.remove('active'));

      // active currently matching links
      const linksToActivate = document.querySelectorAll(`a[view-link][href="${pathname}"]`);
      linksToActivate.forEach(link => link.classList.add('active'));

      this.navigate({ pathname, search });
    };
    const setRouterLinks = link =>
      link.addEventListener('click', event => handleLinkClick({ event, link }));

    const {
      location: { pathname, search },
    } = window;
    if (pathname && pathname !== '/') {
      this.navigate({ pathname, search });
    } else {
      this.navigate({ pathname: '/home', search });
    }

    this.links.forEach(setRouterLinks);
  }
}
