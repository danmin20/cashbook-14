import './scss/index.scss';
import { initRouter } from './lib/router';
import diff from './core/diff';
import Main from './Pages/Main';

declare global {
  interface Window {
    virtualDOM: HTMLElement;
  }
}

const routes = [{ path: '/', component: Main }];

const $app = document.querySelector('#app');
export const updateRealDOM = () => {
  window.requestAnimationFrame(() => {
    if ($app) diff(document.body, $app, window.virtualDOM);
  });
};

if ($app) {
  console.log($app);
  window.virtualDOM = document.createElement('div');
  window.virtualDOM.id = 'app';
  initRouter({ $app: window.virtualDOM, routes });
}

window.addEventListener('forceRender', () => {
  updateRealDOM();
});
