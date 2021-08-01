import dayjs from 'dayjs';
import {
  getMyIncomeCategories,
  getMyOutcomeCategories,
  getMyPayments,
} from '../../../api/me';
import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import { userState } from '../../../Model';
import { CategoryType, PaymentType } from '../../../shared/type';
import { getState, setState, subscribe } from '../../../utils/observer';
import InputBarInput from '../../atom/InputBarInput';
import InputBarSelect from '../../atom/InputBarSelect';
import SaveButton from '../../atom/SaveButton';
import './style';

export interface InputBarProps {}

export interface InputBarStates {
  paymentType: string;
  date: string;
  category: string | null;
  content: string | null;
  payment: string | null;
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
      date: dayjs(new Date()).format('YYYYMMDD'),
      category: null,
      content: null,
      payment: null,
      amount: null,
    };

    this.$saveBtn = new SaveButton({
      isActive: true,
      type: 'large',
      onClick: () => {},
    }).$dom;

    const setIncomeCategories = setState(userState.myIncomeCategories);
    const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    getMyIncomeCategories().then((res) => setIncomeCategories(res));
    getMyOutcomeCategories().then((res) => setOutcomeCategories(res));
    getMyPayments().then((res) => setPayments(res));

    this.setDom();
  }

  willMount() {
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

    // 분류
    this.$categorySelect = new InputBarSelect({
      content: this.state.category,
      setContent: (category: string) => this.setState({ category }),
      type:
        this.state.paymentType === 'income'
          ? 'incomeCategories'
          : 'outcomeCategories',
    }).$dom;

    // 결제수단
    this.$paymentSelect = new InputBarSelect({
      content: this.state.payment,
      setContent: (payment: string) => this.setState({ payment }),
      type: 'payments',
    }).$dom;
  }

  render() {
    const { paymentType } = this.state;

    return jsx`
      <div class='input-bar'>

        <div class='input-bar__buttons'>
          <div onClick=${() =>
            this.setState({ paymentType: 'outcome' })} class='${
      paymentType === 'outcome' ? 'active' : ''
    }'>지출</div>
          <div onClick=${() =>
            this.setState({ paymentType: 'income' })} class='${
      paymentType === 'income' ? 'active' : ''
    }'>수입</div>
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
