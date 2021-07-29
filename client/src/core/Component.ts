import { updateRealDOM } from '../index';

export interface PropsType {}
export interface StateType {}

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

  constructor(props: P) {
    ++Component.ID;
    this.props = props;
    this.state = {} as S;
    this.$dom = document.createElement('code');
  }

  willMount() {}
  didMount() {}

  setDom(): void {
    this.willMount();
    this.$dom = this.render() as Element;
  }

  render(): HTMLElement | ChildNode | DocumentFragment {
    throw new Error('need to be implemented');
  }

  updateDOM(): void {
    const $copy = this.render();
    this.$dom.parentNode?.replaceChild($copy, this.$dom);
    this.$dom = $copy as Element;
  }

  update(): void {
    this.willMount();
    this.updateDOM();
    this.didMount();
  }

  setState(newState: Partial<S>) {
    const nextState = { ...this.state, ...newState };
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
      return;
    }
    this.state = nextState;
    this.update();
    updateRealDOM();
  }
}
