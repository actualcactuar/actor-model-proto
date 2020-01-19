export const createRouter = routes => {
  const container = document.querySelector('#router-outlet-container');
  const outlet = document.querySelector('#router-outlet');
  const notfoundView = document.querySelector('#notfound').content.cloneNode(true);

  const render = async ({ identifier, resolve, onRender }) => {
    outlet.innerHTML = null;

    // activate correct view
    const view = document.querySelector(`#${identifier}`);
    const clone = view ? view.content.cloneNode(true) : notfoundView;
    outlet.appendChild(clone);

    const resolverResponse = resolve ? await resolve() : null;

    if (onRender) {
      onRender({ resolverResponse, outletRef: outlet });
    }
    container.classList.remove('route-loading');
  };

  const navigate = ({ pathname, search }) => {
    const route = routes.find(({ path }) => path === pathname);
    const fullPath = search ? pathname + search : pathname;
    container.classList.add('route-loading');

    if (route) {
      const { identifier, resolve, onRender } = route;
      history.pushState(identifier, null, fullPath);
      render({ identifier, resolve, onRender });
      return;
    }

    render({ identifier: 'notfound', path: fullPath });
  };

  const {
    location: { pathname, search },
  } = window;
  if (pathname && pathname !== '/') {
    navigate({ pathname, search });
  } else {
    navigate({ pathname: '/home', search });
  }

  window.addEventListener('popstate', ({ state }) => {
    render({ identifier: state, path: location.pathname + location.search });
  });

  return { navigate };
};

export const defineRouterLink = navigate => {
  class RouterLink extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('click', event => {
        event.preventDefault();
        const pathname = this.getAttribute('href');
        const search = this.getAttribute('search');

        const links = document.querySelectorAll('router-link');
        links.forEach(link => link.classList.remove('active'));

        // active currently matching links
        const linksToActivate = document.querySelectorAll(`router-link[href="${pathname}"]`);
        linksToActivate.forEach(link => link.classList.add('active'));

        navigate({ pathname, search });
      });
    }
  }

  customElements.define('router-link', RouterLink);
};
