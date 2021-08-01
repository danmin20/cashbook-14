import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import Header from '@/Components/atom/Header';
import CalendarContainer from '@/Components/organism/CalendarContainer';

export default class CalendarPage extends Component<PropsType, StateType> {
  $header: Element;
  $calendar: Element;

  constructor(props: PropsType) {
    super(props);

    this.$header = new Header({}).$dom;
    this.$calendar = new CalendarContainer({}).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div class='wrapper cal'>
        <div class='top'>
          ${this.$header}
        </div>
        ${this.$calendar}
      </div>
    `;
  }
}
