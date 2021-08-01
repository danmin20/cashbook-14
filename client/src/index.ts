import './scss/index.scss';
import { initRouter } from './lib/router';
import diff from './core/diff';
import Main from './Pages/Main';
import Calendar from './Pages/Calendar';
import Chart from './Pages/Chart';
import Login from './Pages/Login';

declare global {
  interface Window {
    virtualDOM: HTMLElement;
  }
}

const routes = [
  { path: '/', page: Main },
  { path: '/login', page: Login },
  { path: '/calendar', page: Calendar },
  { path: '/chart', page: Chart },
];

const $app = document.querySelector('#app');
export const updateRealDOM = () => {
  window.requestAnimationFrame(() => {
    if ($app) diff(document.body, $app, window.virtualDOM);
  });
};

if ($app) {
  window.virtualDOM = document.createElement('div');
  window.virtualDOM.id = 'app';
  initRouter({ $app: window.virtualDOM, routes });
}

window.addEventListener('forceRender', () => {
  updateRealDOM();
});
