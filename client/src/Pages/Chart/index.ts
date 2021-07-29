import Component, { PropsType, StateType } from '../../core/Component';
import jsx from '../../core/jsx';
import Header from '../../Components/atom/Header';
import './style';

export default class Chart extends Component<PropsType, StateType> {
  $header: Element;

  constructor(props: PropsType) {
    super(props);

    this.$header = new Header({}).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div class='wrapper'>
        <div class='top'>
          ${this.$header}
        </div>
      </div>
    `;
  }
}
