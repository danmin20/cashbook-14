import { createHistory } from '@/api/history';
import SaveButton from '@/Components/atom/SaveButton';
import Component, { PropsType } from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, subscribe } from '@/core/observer';
import { $router } from '@/core/router';
import { historyInputState } from '@/Model';
import { HistoryInputType } from '@/shared/type';

interface CreateBtnState {
  isActive: boolean;
}

export class CreateBtn extends Component<PropsType, CreateBtnState> {
  $saveBtn: Element = jsx``;

  handleClickSaveBtn = () => {
    const data = getState(historyInputState) as HistoryInputType;

    if (this.state.isActive)
      createHistory({
        paymentId: data.payment.id ?? undefined,
        categoryId: data.category.id ?? undefined,
        date: `${data.year}-${data.month}-${data.date}`,
        content: data.content,
        amount: parseInt(data.amount.replace(/,/g, '')),
        type: data.paymentType,
      }).then(() => $router.push('/'));
  };

  constructor(props: PropsType) {
    super(props);

    subscribe(historyInputState, 'create-btn', this.update.bind(this));

    this.setDom();
  }
  willMount() {
    const data = getState(historyInputState) as HistoryInputType;

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
      this.setState({ isActive: true });
    } else {
      this.setState({ isActive: false });
    }

    this.$saveBtn = new SaveButton({
      disabled: !this.state.isActive,
      type: 'large',
      onClick: this.handleClickSaveBtn,
    }).$dom;
  }
  willUpdate() {
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
