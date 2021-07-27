import { updateRealDOM } from '../index';
import { stateCmp } from '../util';
import { parseJSX } from './parse';
export interface PropsType {}
export interface StateType {
  date: any;
}
type Partial<T> = {
  [P in keyof T]?: T[P];
};
export type ComponentId = string;

const TAG: string = 'C-';

export default class Component<
  P extends PropsType = PropsType,
  S extends StateType = StateType
> {
  props: P;
  state: S;

  id: ComponentId = TAG + Component.ID;
  $dom: Element;

  static ID: number = 0;

  $components: {
    [key: string]: Component;
  } = {};

  constructor(props: P) {
    ++Component.ID;
    this.props = props;
    this.state = {} as S;
    this.$dom = document.createElement('code');
  }

  onStart() {}

  // addComponent<PT = PropsType>(component: any, props: PT): ComponentId {
  //   const newComponent = new component(props);
  //   this.$components[newComponent.id] = newComponent;
  //   return newComponent.$dom;
  // }

  setDom(): void {
    this.$dom = parseJSX(this.render(), this.$components);
    this.addEvents();
  }

  render(): HTMLElement | ChildNode | DocumentFragment {
    throw new Error('need to be implemented');
  }

  updateDOM(): void {
    const $copy = parseJSX(this.render(), this.$components);

    this.$dom.parentNode?.replaceChild($copy, this.$dom);
    this.$dom = $copy;
  }

  update(): void {
    this.onStart();
    this.updateDOM();
    this.addEvents();
  }

  addEvents(): void {}

  setState(newState: Partial<S>, cb?: Function) {
    const nextState = { ...this.state, ...newState };
    if (stateCmp(this.state, nextState) === 'Same') {
      return;
    }
    this.state = { ...this.state, ...newState };
    cb?.();
    this.update();
    updateRealDOM();
  }
}
