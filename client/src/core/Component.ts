import { updateRealDOM } from '../index';
import { stateCmp } from '../util';

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

  onStart() {}

  setDom(): void {
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
    this.onStart();
    this.updateDOM();
  }

  setState(newState: Partial<S>) {
    const nextState = { ...this.state, ...newState };
    if (stateCmp(this.state, nextState) === 'Same') {
      return;
    }
    this.state = nextState;
    this.update();
    updateRealDOM();
  }
}
