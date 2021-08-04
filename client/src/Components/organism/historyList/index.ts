import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, subscribe } from '@/core/observer';
import { userState } from '@/Model';
import DayList from '@/Components/atom/DayList';
import List, { ListProps } from '@/Components/molecule/list';
import Info from '@/Components/molecule/Info';
import { AllHistorytype } from '@/shared/type';
import './style';

interface HistoryListState {
  checked: ('income' | 'outcome')[];
}

export default class HistoryList extends Component<
  PropsType,
  HistoryListState
> {
  $info: Element = jsx``;
  histories: AllHistorytype = {
    date: '',
    histories: [],
    totalIncome: 0,
    totalOutcome: 0,
    totalCount: 0,
    totalIncomeCount: 0,
    totalOutcomeCount: 0,
  };

  constructor(props: PropsType) {
    super(props);

    this.state = {
      checked: ['income', 'outcome'],
    };
    subscribe(userState.myHistories, 'main-histories', this.update.bind(this));

    this.setDom();
  }

  willMount() {
    this.histories = getState(userState.myHistories) as AllHistorytype;

    this.$info = new Info({
      income: this.histories.totalIncome,
      outcome: this.histories.totalOutcome,
      totalCount: this.histories.totalCount,
      incomeCount: this.histories.totalIncomeCount,
      outcomeCount: this.histories.totalOutcomeCount,
      checked: this.state.checked,
      handleCheck: (newState: ('income' | 'outcome')[]) =>
        this.setState({ checked: newState }),
    }).$dom;
  }

  render() {
    const { checked } = this.state;

    return jsx`
    <div>
    ${this.histories?.histories?.length > 0 ? this.$info : ''}
      <div class='history-list'>${
        this.histories?.histories?.length > 0
          ? this.histories?.histories.map(
              ({ date, histories, totalIncome, totalOutcome }) => {
                return jsx`<div>${
                  new DayList({
                    date,
                    income: totalIncome,
                    outcome: totalOutcome,
                  }).$dom
                }
          ${histories.map((history: ListProps) => {
            if (
              (history.type === 'income' &&
                checked.find((i) => i === 'income')) ||
              (history.type === 'outcome' &&
                checked.find((i) => i === 'outcome'))
            ) {
              return jsx`<div>${
                new List({
                  listType: 'large',
                  content: history.content,
                  payment: history.payment,
                  type: history.type,
                  amount: history.amount,
                  category: {
                    name: history.category.name,
                    color: history.category.color,
                  },
                }).$dom
              }</div>`;
            } else {
              return jsx``;
            }
          })}
          </div>`;
              }
            )
          : jsx`
          <div class='no-data'>
            <div class='title-wave'>NO DATA</div>
          </div>`
      }</div>
    </div>`;
  }
}
