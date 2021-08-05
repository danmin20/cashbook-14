import Component, { StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import DayList from '@/Components/atom/DayList';
import List, { ListProps } from '@/Components/molecule/list';
import { HistoriesType } from '@/shared/type';
import { delete as delBtn } from '@/../assets';
import './style';

interface DetailInfoProps {
  histories: HistoriesType;
  handleClose: Function;
}

export default class DetailInfo extends Component<DetailInfoProps, StateType> {
  $info: Element = jsx``;
  $dayList: Element;

  constructor(props: DetailInfoProps) {
    super(props);

    const { histories } = this.props;

    this.$dayList = new DayList({
      date: histories?.date,
      income: histories?.totalIncome,
      outcome: histories?.totalOutcome,
    }).$dom;

    this.setDom();
  }

  render() {
    const { histories, handleClose } = this.props;

    return jsx`
      <div class='detail-info'>
        <img onClick=${handleClose} class='del-btn' src=${delBtn} />
        <div class='detail-info__content'>
        ${jsx`
          <div>${this.$dayList}
            ${histories?.histories.map((history: ListProps) => {
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
            })}
          </div>`}
        </div>
      </div>`;
  }
}
