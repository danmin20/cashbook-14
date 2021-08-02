import { arrow } from '@/../assets';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { setState } from '@/core/observer';
import { dateState } from '@/Model';
import './style';

interface DateSelectProps {
  beforeDate: { year: string; month: string };
}
interface DateSelectState {
  selectedYear: string;
  selectedMonth: string;
}

export default class DateSelect extends Component<
  DateSelectProps,
  DateSelectState
> {
  years = [...Array(10).keys()].map((i) => new Date().getFullYear() - i);
  months = [...Array(12).keys()].map((i) => i + 1);
  setDate: Function;

  constructor(props: DateSelectProps) {
    super(props);

    this.state = {
      selectedYear: this.props.beforeDate.year,
      selectedMonth: this.props.beforeDate.month,
    };

    const setDateState = setState(dateState);
    this.setDate = () => {
      let d = new Date();
      d.setDate(1);
      d.setMonth(parseInt(this.state.selectedMonth) - 1);
      d.setFullYear(parseInt(this.state.selectedYear));
      setDateState(d);
    };

    this.setDom();
  }
  render() {
    const { selectedMonth, selectedYear } = this.state;
    return jsx`
      <div class='date-select'>
        <div class='date-select__years'>
          ${this.years.map(
            (i) =>
              jsx`<div onClick=${() =>
                this.setState({ selectedYear: i.toString() })} class='box${
                selectedYear === i.toString() ? ' selected' : ''
              }'>${i}</div>`
          )}
        </div>
        <div class='date-select__months'>
          ${this.months.map(
            (i) =>
              jsx`<div onClick=${() =>
                this.setState({ selectedMonth: i.toString() })} class='box${
                selectedMonth === i.toString() ? ' selected' : ''
              }'>${i}</div>`
          )}
        </div>

        <img onClick=${this.setDate} src=${arrow} />
      </div>
    `;
  }
}
