import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { delete as delbtn } from '@/../assets';
import './style';
import { CategoryType, PaymentType } from '@/shared/type';
import Alert from '@/Components/molecule/Alert';
import { getState } from '@/core/observer';
import { userState } from '@/Model';

interface DropDownProps {
  selectType: 'payment' | 'incomeCategory' | 'outcomeCategory';
  setContent: Function;
  paymentType?: 'income' | 'outcome';
}

interface DropDownState {
  isAlertOpened: boolean;
  items: CategoryType[] | PaymentType[];
}

export default class DropDown extends Component<DropDownProps, DropDownState> {
  $alert: Element = jsx``;
  openDelAlert = (e: Event, item: CategoryType | PaymentType) => {
    e.stopPropagation();

    this.$alert = new Alert({
      closeAlert: () => this.setState({ isAlertOpened: false }),
      select: this.props.selectType !== 'payment' ? 'category' : 'payment',
      type: 'delete',
      delItem: item,
      content: `해당 ${
        this.props.selectType === 'payment' ? '결제수단을' : '카테고리를'
      } 삭제하시겠습니까?`,
    }).$dom;

    this.setState({ isAlertOpened: true });
  };
  openAddAlert = () => {
    this.$alert = new Alert({
      closeAlert: () => this.setState({ isAlertOpened: false }),
      select: this.props.selectType !== 'payment' ? 'category' : 'payment',
      type: 'add',
      paymentType: this.props.paymentType as 'income' | 'outcome',
      content:
        this.props.selectType === 'payment' ? '결제수단 추가' : '카테고리 추가',
    }).$dom;

    this.setState({ isAlertOpened: true });
  };

  constructor(props: DropDownProps) {
    super(props);

    this.state = {
      isAlertOpened: false,
      items: [],
    };

    this.setDom();
  }

  willUpdate() {}

  render() {
    const { setContent, selectType } = this.props;

    if (selectType === 'incomeCategory') {
      this.setState({
        items: getState(userState.myIncomeCategories) as CategoryType[],
      });
    } else if (selectType === 'outcomeCategory') {
      this.setState({
        items: getState(userState.myOutcomeCategories) as CategoryType[],
      });
    } else {
      this.setState({
        items: getState(userState.myPayments) as CategoryType[],
      });
    }

    return jsx`
    <div onClick=${(e: Event) => e.stopPropagation()}>
      <div class='dropdown-wrapper'>

        <div class='dropdown'>
          ${this.state.items.map(
            (item) =>
              jsx`
              <div onClick=${() => setContent(item)} class='dropdown__item'>
                <div class='dropdown__item--item'>
                  ${
                    selectType !== 'payment'
                      ? jsx`<div class='color' style='background: ${
                          (item as CategoryType).color
                        }'></div>`
                      : ''
                  }
                  ${item.name}
                </div>

                <img onClick=${(e: Event) =>
                  this.openDelAlert(e, item)} src=${delbtn} />
              </div>`
          )}
        </div>
        
        <div onClick=${this.openAddAlert} class='add-btn'>+</div>

      </div>
      ${
        this.state.isAlertOpened
          ? jsx`
            <div>
              <div class='modal-container'>
                ${this.$alert}
              </div>
              <div class='background' />
            </div>
          `
          : ''
      }
      </div>
    `;
  }
}
