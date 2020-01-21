const defineRouterLink = navigate => {
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

export const createFragment = html => {
  const fragment = document.createElement('template');
  fragment.innerHTML = html;
  return fragment.content;
};

export const useTemplate = id => {
  const template = document.getElementById(id);
  const clone = template.content.cloneNode(true);
  return clone;
};

export const createRouter = (routes, { notFoundFragment } = {}) => {
  const buildRouteRegex = route => {
    const formattedRoute = route.path
      .split('/')
      .map(str => {
        if (str.match(':')) {
          return '(.[^/])*\\w+';
        }
        return str;
      })
      .join('/');
      console.log(formattedRoute)
    const regex = new RegExp(`^${formattedRoute}$`, 'i');
    console.log(regex)
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

  const container = document.querySelector('#router-outlet-container');
  const outlet = document.querySelector('#router-outlet');
  const notFound = notFoundFragment || createFragment(`<h2>404 - Page not found :c</h2>`);
  const formattedRoutes = routes.map(buildRouteRegex);
  const render = async ({ resolve, onRender, fragment, params = {} }) => {
    // activate correct view
    const element = fragment ? fragment() : notfoundView;

    const result = resolve ? await resolve(params) : null;

    if (onRender) {
      onRender({ result, fragment: element, params });
    }

    outlet.innerHTML = null;
    outlet.appendChild(element);
    container.classList.remove('route-loading');
  };

  const navigate = ({ pathname, search, skipPush }) => {
    const route = formattedRoutes.find(({ regex }) => regex.test(pathname));

    const fullPath = search ? pathname + search : pathname;
    container.classList.add('route-loading');

    if (route) {
      if (!skipPush) history.pushState(fullPath, null, fullPath);

      const params = buildRouteParams({ route, pathname });
      render({ ...route, params });
      return;
    }

    history.pushState('notfound', null, fullPath);
    render({ fragment: () => notFound, path: fullPath });
  };

  const {
    location: { pathname, search },
  } = window;
  if (pathname && pathname !== '/') {
    navigate({ pathname, search, skipPush: true });
  } else {
    navigate({ pathname: '/home', search });
  }

  window.addEventListener('popstate', ({ state }) => navigate({ pathname: state, skipPush: true }));
  defineRouterLink(navigate);
  return navigate;
};
