import Header from '../../Components/atom/Header';
import Component from '../../core/Component';
import jsx from '../../core/jsx';
import './style';

export interface HeaderStates {
  date: Date;
}

export default class Main extends Component<HeaderStates> {
  $header: Element;

  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
    };

    this.$header = new Header({
      date: this.state.date,
    }).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div>
        <div class="top">
          ${this.$header}
        </div>
      </div>
    `;
  }
}
