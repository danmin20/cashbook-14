import { createHistory } from '@/api/history';
import {
  getMyIncomeCategories,
  getMyOutcomeCategories,
  getMyPayments,
} from '@/api/me';
import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { $router } from '@/core/router';
import { userState } from '@/Model';
import { setState } from '@/core/observer';
import InputBarInput from '@/Components/atom/InputBarInput';
import {
  CategorySelect,
  PaymentSelect,
} from '@/Components/molecule/InputBarSelect';
import SaveButton from '@/Components/atom/SaveButton';
import './style';
import { minus } from '@/../assets';

export interface InputBarProps {}

export interface InputBarStates {
  paymentType: 'income' | 'outcome';
  category: {
    id: number;
    name: string;
  };
  payment: {
    id: number;
    name: string;
  };
}

export default class InputBar extends Component<InputBarProps, InputBarStates> {
  $saveBtn: Element;
  $dateInput: Element;
  $contentInput: Element;
  $amountInput: Element;
  $categorySelect: Element = jsx``;
  $paymentSelect: Element = jsx``;

  constructor(props: InputBarProps) {
    super(props);

    this.state = {
      paymentType: 'outcome',
      category: {
        id: 0,
        name: '',
      },
      payment: {
        id: 0,
        name: '',
      },
    };

    this.$saveBtn = new SaveButton({
      isActive: true,
      type: 'large',
      onClick: () => {
        createHistory({
          paymentId: this.state.payment.id ?? undefined,
          categoryId: this.state.category.id ?? undefined,
          date: (this.$dom.querySelector('#date-input') as HTMLInputElement)
            .value,
          content: (
            this.$dom.querySelector('#content-input') as HTMLInputElement
          ).value,
          amount: parseInt(
            (this.$dom.querySelector('#amount-input') as HTMLInputElement).value
          ),
          type: this.state.paymentType,
        }).then(() => $router.push('/'));
      },
    }).$dom;

    const setIncomeCategories = setState(userState.myIncomeCategories);
    const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    getMyIncomeCategories().then((res) => setIncomeCategories(res));
    getMyOutcomeCategories().then((res) => setOutcomeCategories(res));
    getMyPayments().then((res) => setPayments(res));

    // 일자
    this.$dateInput = new InputBarInput({}).$dom;
    this.$dateInput.id = 'date-input';
    // 내용
    this.$contentInput = new InputBarInput({}).$dom;
    this.$contentInput.id = 'content-input';
    // 금액
    this.$amountInput = new InputBarInput({}).$dom;
    this.$amountInput.id = 'amount-input';

    this.setDom();
  }

  willMount() {
    // 분류
    this.$categorySelect = new CategorySelect({
      content: this.state.category.name,
      setContent: (category: { id: number; name: string }) =>
        this.setState({ category }),
      type:
        this.state.paymentType === 'income'
          ? 'incomeCategories'
          : 'outcomeCategories',
    }).$dom;

    // 결제수단
    this.$paymentSelect = new PaymentSelect({
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
            <div>
              <img src=${minus} />
              ${
                paymentType === 'outcome'
                  ? ''
                  : jsx`<img style='transform: rotate(90deg)' src=${minus} />`
              }
            </div>
            ${this.$amountInput} 원
          </div>
        </div>
        ${this.$saveBtn}
      </div>
    `;
  }
}
