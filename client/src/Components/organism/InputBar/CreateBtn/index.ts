import SaveButton from '@/Components/atom/SaveButton';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, setState, subscribe } from '@/core/observer';
import { historyInputState } from '@/Model';
import { HistoryInputType } from '@/shared/type';

interface CreateBtnState {
  isActive: boolean;
}

export class CreateBtn extends Component<PropsType, CreateBtnState> {
  $saveBtn: Element = jsx``;

  handleClickSaveBtn = () => {
    // createHistory({
    //   paymentId: this.state.payment.id ?? undefined,
    //   categoryId:
    //     (this.state.paymentType === 'income'
    //       ? this.state.incomeCategory.id
    //       : this.state.outcomeCategory.id) ?? undefined,
    //   date: `${this.$yearInput.value}-${this.$monthInput.value}-${this.$dateInput.value}`,
    //   content: (this.$dom.querySelector('#content-input') as HTMLInputElement)
    //     .value,
    //   amount: parseInt(
    //     (
    //       this.$dom.querySelector('#amount-input') as HTMLInputElement
    //     ).value.replace(/,/g, '')
    //   ),
    //   type: this.state.paymentType,
    // }).then(() => $router.push('/'));
  };

  constructor(props: PropsType) {
    super(props);

    subscribe(historyInputState, 'create-btn', this.update.bind(this));

    this.setDom();
  }
  willMount() {
    const data = getState(historyInputState) as HistoryInputType;
    console.log(data);
    if (
      data.amount &&
      data.category.name &&
      data.content &&
      data.year &&
      data.month &&
      data.date &&
      data.payment.name &&
      data.paymentType
    ) {
      console.log('isactive');
      this.setState({ isActive: true });
    }

    this.$saveBtn = new SaveButton({
      disabled: !this.state.isActive,
      type: 'large',
      onClick: this.handleClickSaveBtn,
    }).$dom;
  }
  willUpdate() {
    console.log('aaa');
    this.$saveBtn = new SaveButton({
      disabled: !this.state.isActive,
      type: 'large',
      onClick: this.handleClickSaveBtn,
    }).$dom;
  }
  render() {
    return this.$saveBtn;
  }
}
