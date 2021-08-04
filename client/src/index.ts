import './scss/index.scss';
import { initRouter } from './core/router';
import diff from './core/diff';
import Main from './Pages/Main';
import Calendar from './Pages/Calendar';
import Chart from './Pages/Chart';
import Login from './Pages/Login';
import { Route } from './shared/type';
import Component from '@/core/Component';

declare global {
  interface Window {
    virtualDOM: HTMLElement;
  }
}

const routes: Route[] = [
  { path: '/', page: Main as typeof Component },
  { path: '/login', page: Login as typeof Component },
  { path: '/calendar', page: Calendar as typeof Component },
  { path: '/chart', page: Chart as typeof Component },
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
