import { updateRealDOM } from '../index';
import Component from '@/core/Component';

type Route = {
  path: any;
  page: any;
  redirect?: string;
  component?: any;
  middlewares?: any;
};

class Router {
  $app: HTMLElement;
  routes: {
    [key: string]: typeof Component;
  } = {};
  fallback: string = '/';

  constructor({ $app, routes, fallback = '/' }: any) {
    this.$app = $app;
    this.fallback = fallback;

    this.generateRoutes(routes);

    this.initEvent();
  }

  generateRoutes(routes: Route[]): void {
    this.routes = {};

    routes.forEach((route: Route) => {
      this.routes[route.path] = route.page;
    });
  }

  initEvent() {
    window.addEventListener('hashchange', () => this.onHashChangeHandler());
  }

  hasRoute(path: string) {
    return typeof this.routes[path] !== 'undefined';
  }

  getNotFoundRouter() {
    return this.routes['not_found'];
  }

  getRouter(path: string) {
    return this.routes[path];
  }

  onHashChangeHandler() {
    const hash = window.location.hash;
    let path = hash.substr(1);

    let route = this.getNotFoundRouter();
    const regex = /\w{1,}$/;

    if (this.hasRoute(path)) {
      route = this.getRouter(path);
    } else if (regex.test(path)) {
      route = this.getRouter(path.replace(regex, ':id'));
    } else {
      route = this.getRouter(this.fallback);
    }

    const page = new route({});
    if (this.$app.lastElementChild)
      this.$app.replaceChild(page.$dom, this.$app.lastElementChild);
    else this.$app.appendChild(page.$dom);
    updateRealDOM();
  }

  push(path: string) {
    window.location.hash = path;
  }
}

export let $router: {
  push: (path: string) => void;
};

export function initRouter({
  $app,
  routes,
}: {
  $app: HTMLElement;
  routes: Route[];
}): void {
  const router = new Router({ $app, routes });

  $router = {
    push: (path) => router.push(path),
  };

  router.onHashChangeHandler();
}
