import { updateRealDOM } from '../index';
import { ClassElement } from 'typescript';
import Component from '../core/Component';

function isClass(value: ClassElement) {
  return Boolean(value && value.toString().startsWith('class '));
}
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
    window.addEventListener('hashchange', () =>
      this.onHashChangeHandler.bind(this)
    );
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

  // getComponent(route: Route) {
  //   const component = route.component;
  //   return component;
  // }

  onHashChangeHandler() {
    const hash = window.location.hash;
    let path = hash.substr(1);

    /* 동적 라우팅 처리 */

    let route = this.getNotFoundRouter();
    const regex = /\w{1,}$/; // 동적 라우팅으로 전달되는 :id 는 모두 [문자열 + 숫자] 조합으로 간주

    if (this.hasRoute(path)) {
      route = this.getRouter(path);
    } else if (regex.test(path)) {
      // 주소가 없는 경우를 동적 라우팅으로 간주하고 이를 :id 로 치환
      route = this.getRouter(path.replace(regex, ':id'));
    } else {
      // 그 외 입력되지 않은 모든 주소에 대해서는 fallback 실행
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

/**
 * @param {{$app: HTMLElement, routes: Route[], fallback?: string}} options
 */
export function initRouter({
  $app,
  routes,
}: {
  $app: HTMLElement;
  routes: Route[];
}): void {
  // dropdown 영역 밖 클릭 시 드랍다운 제거 이벤트는 최상단 $app에서 관리
  // handleDropdown($app);

  const router = new Router({ $app, routes });

  router.onHashChangeHandler();
}

// function handleDropdown($app: HTMLElement) {
//   $app.addEventListener('click', (e: MouseEvent) => {
//     const $dropdowns = $app.querySelectorAll<HTMLElement>('.dropdown');
//     $dropdowns.forEach((dropdown) => {
//       const isOpen = dropdown.className.includes('open-dropdown');

//       if (isOpen) {
//         dropdown.classList.remove('open-dropdown');
//       }
//     });
//   });
// }
