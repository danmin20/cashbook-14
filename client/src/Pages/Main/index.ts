import Header from '../../Components/atom/Header';
import InputBar from '../../Components/molecule/InputBar';
import Component from '../../core/Component';
import jsx from '../../core/jsx';
import './style';

export interface HeaderStates {
  date: Date;
}

export default class Main extends Component<HeaderStates> {
  $header: Element;
  $inputBar: Element;

  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
    };

    this.$header = new Header({
      date: this.state.date,
    }).$dom;

    this.$inputBar = new InputBar({}).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div>
        <div class='top'>
          ${this.$header}
          <div class='input-bar-wrapper'>
            ${this.$inputBar}
          </div>
        </div>
      </div>
    `;
  }
}
