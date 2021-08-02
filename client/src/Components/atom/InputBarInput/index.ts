import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import './style';

export default class InputBarInput extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.setDom();
  }

  render() {
    return jsx`
      <input class='input' placeholder='입력하세요' />
    `;
  }
}
