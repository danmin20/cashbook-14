import Component from './Component';

const replaceComponent = (
  $parentNode: Element,
  $curr: Element,
  components: {
    [key: string]: Component;
  }
) => {
  const nodeName = $curr.nodeName;

  if (components[nodeName]) {
    const $new = components[nodeName].$dom;

    $parentNode.replaceChild($new, $curr);
  }
};

const searchTraverse = (
  $tar: Element,
  components: {
    [key: string]: Component;
  }
) => {
  const $children = Array.from($tar.children);

  if ($children.length === 0) {
    if ($tar.parentElement) {
      replaceComponent($tar.parentElement, $tar, components);
      return;
    }
  }

  $children.forEach(($el) => {
    searchTraverse($el, components);
  });
};

export const parseJSX = (
  html: HTMLElement | ChildNode | DocumentFragment,
  components: {
    [key: string]: Component;
  }
): Element => {
  const $dom = document.createElement('div');
  $dom.append(html);

  searchTraverse($dom, components);

  return $dom.firstElementChild ?? $dom;
};
