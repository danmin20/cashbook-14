import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import { delete as delbtn } from '../../../../assets';
import './style';
import { CategoryType, PaymentType } from '../../../shared/type';
import Alert from '../../molecule/Alert';

interface DropDownProps {
  selectType: 'payment' | 'category';
  items: CategoryType[] | PaymentType[];
  setContent: Function;
}

interface DropDownState {
  isAlertOpened: boolean;
}

export default class DropDown extends Component<DropDownProps, DropDownState> {
  $alert: Element = jsx``;

  constructor(props: DropDownProps) {
    super(props);

    this.state = {
      isAlertOpened: false,
    };

    this.setDom();
  }

  willUpdate() {
    this.$alert = new Alert({
      closeAlert: () => this.setState({ isAlertOpened: false }),
      select: this.props.selectType,
      type: 'add',
      content:
        this.props.selectType === 'category'
          ? '카테고리 추가'
          : '결제수단 추가',
    }).$dom;
  }

  render() {
    const { items, setContent } = this.props;

    return jsx`
      <div onClick=${(e: Event) => e.stopPropagation()}
        class='dropdown-wrapper'>

        <div class='dropdown'>
          ${items.map(
            (item) =>
              jsx`<div onClick=${() =>
                setContent(item.name)} class='dropdown__item'>${
                item.name
              }<img src=${delbtn} /></div>`
          )}
        </div>
        
        <div onClick=${() =>
          this.setState({ isAlertOpened: true })} class='add-btn'>+</div>

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
