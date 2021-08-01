import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';

export interface DayListProps {
  date: string;
  income?: number;
  outcome?: number;
}

export default class DayList extends Component<DayListProps> {
  constructor(props: DayListProps) {
    super(props);

    this.setDom();
  }
  render() {
    const { date, income, outcome } = this.props;

    return jsx`
      <div class='day-list'>
        <div>
          ${date} <span>목</span>
        </div>
        <div class='day-list__sum'>
          ${
            income
              ? jsx`<div class='day-list__sum--each'>수입 ${income}</div>`
              : ''
          }
          <div class='day-list__sum--each'>
            지출 ${outcome}
          </div>
        </div>
      </div>
    `;
  }
}
