import { createHistory } from '../../../api/history';
import {
  getMyIncomeCategories,
  getMyOutcomeCategories,
  getMyPayments,
} from '../../../api/me';
import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import { userState } from '../../../Model';
import { setState } from '../../../utils/observer';
import InputBarInput from '../../atom/InputBarInput';
import InputBarSelect from '../../atom/InputBarSelect';
import SaveButton from '../../atom/SaveButton';
import './style';

export interface InputBarProps {}

export interface InputBarStates {
  paymentType: 'income' | 'outcome';
  date: string;
  category: {
    id: number;
    name: string;
  };
  content: string | null;
  payment: {
    id: number;
    name: string;
  };
  amount: number | null;
}

export default class InputBar extends Component<InputBarProps, InputBarStates> {
  $saveBtn: Element;
  $dateInput: Element = jsx``;
  $contentInput: Element = jsx``;
  $amountInput: Element = jsx``;
  $categorySelect: Element = jsx``;
  $paymentSelect: Element = jsx``;

  constructor(props: InputBarProps) {
    super(props);

    this.state = {
      paymentType: 'outcome',
      date: '',
      category: {
        id: 0,
        name: '',
      },
      content: null,
      payment: {
        id: 0,
        name: '',
      },
      amount: null,
    };

    this.$saveBtn = new SaveButton({
      isActive: true,
      type: 'large',
      onClick: () => {
        console.log(
          this.state.paymentType,
          this.state.payment.id,
          this.state.category.id,
          this.state.date,
          this.state.content,
          this.state.amount
        );
        createHistory({
          paymentId: this.state.payment.id ?? undefined,
          categoryId: this.state.category.id ?? undefined,
          date: this.state.date,
          content: this.state.content as string,
          amount: this.state.amount as number,
          paymentType: this.state.paymentType,
        });
      },
    }).$dom;

    const setIncomeCategories = setState(userState.myIncomeCategories);
    const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    getMyIncomeCategories().then((res) => setIncomeCategories(res));
    getMyOutcomeCategories().then((res) => setOutcomeCategories(res));
    getMyPayments().then((res) => setPayments(res));

    // 일자
    this.$dateInput = new InputBarInput({
      setContent: (date: string) => this.setState({ date }),
    }).$dom;
    // 내용
    this.$contentInput = new InputBarInput({
      setContent: (content: string) => this.setState({ content }),
    }).$dom;
    // 금액
    this.$amountInput = new InputBarInput({
      setContent: (amount: string) =>
        this.setState({ amount: parseInt(amount) }),
    }).$dom;

    this.setDom();
  }

  willMount() {
    // 분류
    this.$categorySelect = new InputBarSelect({
      content: this.state.category.name,
      setContent: (category: { id: number; name: string }) =>
        this.setState({ category }),
      type:
        this.state.paymentType === 'income'
          ? 'incomeCategories'
          : 'outcomeCategories',
    }).$dom;

    // 결제수단
    this.$paymentSelect = new InputBarSelect({
      content: this.state.payment.name,
      setContent: (payment: { id: number; name: string }) =>
        this.setState({ payment }),
      type: 'payments',
    }).$dom;
  }

  render() {
    const { paymentType } = this.state;

    return jsx`
      <div class='input-bar'>

        <div class='input-bar__buttons'>
          <div onClick=${() => {
            this.setState({ paymentType: 'outcome' });
            this.setState({ category: { id: 0, name: '' } });
          }} class='${paymentType === 'outcome' ? 'active' : ''}'>지출</div>
          <div onClick=${() => {
            this.setState({ paymentType: 'income' });
            this.setState({ category: { id: 0, name: '' } });
          }} class='${paymentType === 'income' ? 'active' : ''}'>수입</div>
        </div>

        <div class='input-bar__input'>
          <div class='input-bar__input--label'>일자</div>
          <div class='input-bar__input--content'>
            ${this.$dateInput}
          </div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>분류</div>
          <div class='input-bar__input--content'>
            ${this.$categorySelect}
          </div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>내용</div>
          <div class='input-bar__input--content'>
            ${this.$contentInput}
          </div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>결제수단</div>
          <div class='input-bar__input--content'>
            ${this.$paymentSelect}
          </div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>금액</div>
          <div class='input-bar__input--content amount'>
            <div>${paymentType === 'income' ? '+' : '-'}</div>
            ${this.$amountInput} 원
          </div>
        </div>
        ${this.$saveBtn}
      </div>
    `;
  }
}
