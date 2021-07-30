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
import SaveButton from '../../atom/SaveButton';
import InputBarInput from './input';
import InputBarSelect from './select';
import './style';

export interface InputBarProps {}

export interface InputBarStates {
  paymentType: string;
  date: string;
  category: string | null;
  content: string | null;
  payment: string | null;
  amount: number | null;

  myIncomeCategories: CategoryType[];
  myOutcomeCategories: CategoryType[];
  myPayments: PaymentType[];
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

    subscribe(
      userState.myIncomeCategories,
      'input-bar-incomecategories',
      this.update.bind(this)
    );
    subscribe(
      userState.myOutcomeCategories,
      'input-bar-outcomecategories',
      this.update.bind(this)
    );
    subscribe(
      userState.myPayments,
      'input-bar-payments',
      this.update.bind(this)
    );

    this.state = {
      paymentType: 'outcome',
      date: dayjs(new Date()).format('YYYYMMDD'),
      category: null,
      content: null,
      payment: null,
      amount: null,

      myIncomeCategories: [],
      myOutcomeCategories: [],
      myPayments: [],
    };

    this.$saveBtn = new SaveButton({
      isActive: true,
      type: 'large',
      onClick: () => {},
    }).$dom;

    // const setIncomeCategories = setState(userState.myIncomeCategories);
    // const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    getMyIncomeCategories().then((res) =>
      this.setState({ myIncomeCategories: res })
    );
    getMyOutcomeCategories().then((res) =>
      this.setState({ myOutcomeCategories: res })
    );
    getMyPayments().then((res) => setPayments(res));

    this.setDom();
  }

  willMount() {
    console.log('a', this.state.myOutcomeCategories);
    // console.log(getState(userState.myIncomeCategories));
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
      items:
        this.state.paymentType === 'income'
          ? this.state.myIncomeCategories
          : this.state.myOutcomeCategories,
    }).$dom;

    // 결제수단
    this.$paymentSelect = new InputBarSelect({
      content: this.state.payment,
      setContent: (payment: string) => this.setState({ payment }),
      items: getState(userState.myPayments) as PaymentType[],
    }).$dom;
  }

  render() {
    const { paymentType, category } = this.state;

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
