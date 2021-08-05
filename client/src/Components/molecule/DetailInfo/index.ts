import Component, { StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import DayList from '@/Components/atom/DayList';
import List, { ListProps } from '@/Components/molecule/list';
import { AllHistorytype } from '@/shared/type';
import { delete as delBtn } from '@/../assets';
import './style';

interface DetailInfoProps {
  histories: AllHistorytype;
  handleClose: Function;
}

export default class DetailInfo extends Component<DetailInfoProps, StateType> {
  $info: Element = jsx``;

  constructor(props: DetailInfoProps) {
    super(props);

    this.setDom();
  }

  render() {
    const { histories, handleClose } = this.props;

    return jsx`
        <div class='detail-info'>
          <img onClick=${handleClose} class='del-btn' src=${delBtn} />
          <div class='detail-info__content'>
          ${
            histories?.histories
              ? histories?.histories.map(
                  ({ date, histories, totalIncome, totalOutcome }) => {
                    return jsx`<div style='height: 100%'>${
                      new DayList({
                        date,
                        income: totalIncome,
                        outcome: totalOutcome,
                      }).$dom
                    }
                ${jsx`<div class='contents'>${histories.map(
                  (history: ListProps) => {
                    return jsx`<div>${
                      new List({
                        listType: 'large',
                        content: history.content,
                        payment: history.payment,
                        type: history.type,
                        amount: history.amount,
                        category: {
                          name: history.category?.name,
                          color: history.category?.color,
                        },
                      }).$dom
                    }</div>`;
                  }
                )}</div>`}
                </div>`;
                  }
                )
              : ''
          }</div>
        </div>`;
  }
}
