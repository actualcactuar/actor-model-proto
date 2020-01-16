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

  async render({ identifier, path, resolve }) {
    this.outlet.innerHTML = null;

    if (resolve) {
      const response = await resolve();
      console.log({ response });
    }

    // activate correct view
    const view = document.querySelector(`#${identifier}`);

    if (view) {
      const clone = view.content.cloneNode(true);
      this.outlet.appendChild(clone);
    } else {
      this.outlet.appendChild(this.notfoundView);
    }

    setTimeout(() => this.container.classList.remove('route-loading'), 200);
  }

  navigate({ pathname, search }) {
    const route = this.routes.find(({ path }) => path === pathname);
    const fullPath = search ? pathname + search : pathname;
    this.container.classList.add('route-loading');
    setTimeout(() => {
      if (route) {
        const { identifier, path, resolve } = route;
        history.pushState(identifier, null, fullPath);
        this.render({ identifier, path, resolve });
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
