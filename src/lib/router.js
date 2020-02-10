const defineRouterLink = navigate => {
  class RouterLink extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('click', event => {
        event.preventDefault();
        const pathname = this.getAttribute('href');
        const search = this.getAttribute('search');

        navigate({ pathname, search });
      });
    }
  }

  customElements.define('router-link', RouterLink);
};

export const useTemplate = id => {
  const template = document.getElementById(id);
  const clone = template.content.cloneNode(true);
  return clone;
};

export const createRouter = (routes, { notFound, onNavigationStart, onNavigationEnd } = {}) => {
  const routerState = {
    isNavigating: false,
    currentRoute: null,
  };

  const buildRouteRegex = route => {
    const formattedRoute = route.path
      .split('/')
      .map(str => {
        if (str.match(':')) {
          return '(.[^\\/])*\\w+';
        }
        return str;
      })
      .join('\\/');
    const regex = new RegExp(`^${formattedRoute}$`);
    return { ...route, regex };
  };

  const buildRouteParams = ({ route, pathname }) => {
    const splitPath = pathname.split('/');
    const params = {};
    route.path.split('/').forEach((param, index) => {
      if (param.match(':')) {
        params[param.slice(1)] = splitPath[index];
      }
    });

    return params;
  };

  const setLinksActive = ({ pathname }) => {
    const links = document.querySelectorAll('router-link');
    links.forEach(link => link.classList.remove('active'));

    // active currently matching links
    const linksToActivate = document.querySelectorAll(`router-link[href="${pathname}"]`);
    linksToActivate.forEach(link => link.classList.add('active'));
  };

  const outlet = document.querySelector('#router-outlet');
  const notFoundRoute = notFound || {
    fragment: () => {
      const h2 = document.createElement('h2');
      h2.innerText = '404 - Page not found :c';
      return h2;
    },
  };
  const formattedRoutes = routes.map(buildRouteRegex);
  const render = async route => {
    const {
      resolve = async () => {},
      onRender,
      fragment,
      params = {},
      regex,
      modifyExisting,
    } = route;
    routerState.currentRoute = route;
    // activate correct view

    const result = await resolve(params);

    console.log(result, regex);
    // once await is complete if user hasn't navigated elsewhere
    if (regex.test(location.pathname)) {
      const element = fragment ? fragment() : notfoundView;

      if (onRender) {
        await onRender({ result, fragment: element, params, outlet });
      }

      if (!modifyExisting) {
        outlet.innerHTML = null;
      }
      outlet.appendChild(element);
      routerState.isNavigating = false;

      if (onNavigationEnd) {
        onNavigationEnd({ ...routerState, outlet });
      }
    }
  };

  const navigate = async ({ pathname, search, skipPush }) => {
    routerState.isNavigating = true;

    if (onNavigationStart) {
      onNavigationStart({ ...routerState, outlet });
    }

    const route = formattedRoutes.find(({ regex }) => regex.test(pathname));

    const fullPath = search ? pathname + search : pathname;

    if (route) {
      const params = buildRouteParams({ route, pathname });
      setLinksActive({ pathname });
      render({ ...route, params });
      if (!skipPush) history.pushState(fullPath, null, fullPath);

      return;
    }

    render({ ...notFoundRoute, path: fullPath });

    setLinksActive({ pathname });
    history.pushState('notfound', null, fullPath);
    console.log(formattedRoutes);
  };

  const {
    location: { pathname, search },
  } = window;
  if (pathname && pathname !== '/') {
    navigate({ pathname, search, skipPush: true });
  } else {
    navigate({ pathname: '/home', search });
  }
  setLinksActive({ pathname });

  window.addEventListener('popstate', ({ state }) => navigate({ pathname: state, skipPush: true }));
  defineRouterLink(navigate);
  return navigate;
};
