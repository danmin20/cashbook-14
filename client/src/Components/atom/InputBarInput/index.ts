import Component, { StateType } from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';

export interface InputBarInputProps {
  setContent: Function;
}

export default class InputBarInput extends Component<
  InputBarInputProps,
  StateType
> {
  constructor(props: InputBarInputProps) {
    super(props);

    this.setDom();
  }

  render() {
    const { setContent } = this.props;

    return jsx`
      <input onChange=${({ target }: { target: HTMLInputElement }) =>
        setContent(target.value)} class='input' placeholder='입력하세요' />
    `;
  }
}
