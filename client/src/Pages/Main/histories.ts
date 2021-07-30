import Component, { PropsType, StateType } from '../../core/Component';
import jsx from '../../core/jsx';
import Header from '../../Components/atom/Header';
import PieGraph from '../../Components/atom/PieGraph';
import { getState, subscribe } from '../../utils/observer';
import { userState } from '../../Model';
import { AllHistorytype } from '.';
import DayList from '../../Components/atom/DayList';
import List, { ListProps } from '../../Components/molecule/list';

export default class Histories extends Component<PropsType, StateType> {
  $header: Element;
  $pieGraph: Element;

  constructor(props: PropsType) {
    super(props);
    subscribe(userState.myHistories, 'a', this.update.bind(this));

    this.$header = new Header({}).$dom;
    this.$pieGraph = new PieGraph({}).$dom;

    this.setDom();
  }

  render() {
    const histories = getState(userState.myHistories) as AllHistorytype;
    console.log('aaaa', histories);

    return jsx`<div>${
      histories?.histories
        ? histories?.histories.map(
            ({ date, histories, totalIncome, totalOutcome }) => {
              return jsx`<div>${
                new DayList({
                  date,
                  income: totalIncome,
                  outcome: totalOutcome,
                }).$dom
              }
         ${histories.map((history: ListProps) => {
           return jsx`<div>${
             new List({
               listType: 'large',
               content: history.content,
               payment: history.payment,
               paymentType: history.paymentType,
               amount: history.amount,
               category: {
                 name: history.category.name,
                 color: history.category.color,
               },
             }).$dom
           }</div>`;
         })}
        </div>`;
            }
          )
        : ''
    }</div>`;
  }
}
