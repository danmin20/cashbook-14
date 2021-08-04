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
import { getState, setState } from '@/core/observer';
import InputBarInput from '@/Components/atom/InputBarInput';
import {
  CategorySelect,
  PaymentSelect,
} from '@/Components/molecule/InputBarSelect';
import SaveButton from '@/Components/atom/SaveButton';
import './style';
import { minus } from '@/../assets';
import { onlyNum } from '@/utils/util';
import { CategoryType } from '@/shared/type';

export interface InputBarProps {}

export interface InputBarStates {
  paymentType: 'income' | 'outcome';
  category: {
    id?: number;
    name: string;
  };
  payment: {
    id: number;
    name: string;
  };
  isBarOpened: boolean;
  isSaveable: boolean;
}

export default class InputBar extends Component<InputBarProps, InputBarStates> {
  $saveBtn: Element = jsx``;

  $yearInput: HTMLInputElement;
  $monthInput: HTMLInputElement;
  $dateInput: HTMLInputElement;

  $contentInput: HTMLInputElement;
  $amountInput: HTMLInputElement;
  $categorySelect: Element = jsx``;
  $paymentSelect: Element = jsx``;

  handleClickSaveBtn = () => {
    createHistory({
      paymentId: this.state.payment.id ?? undefined,
      categoryId: this.state.category.id ?? undefined,
      date: `${this.$yearInput.value}-${this.$monthInput.value}-${this.$dateInput.value}`,
      content: (this.$dom.querySelector('#content-input') as HTMLInputElement)
        .value,
      amount: parseInt(
        (
          this.$dom.querySelector('#amount-input') as HTMLInputElement
        ).value.replace(/,/g, '')
      ),
      type: this.state.paymentType,
    }).then(() => $router.push('/'));
  };

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
      isBarOpened: false,
      isSaveable: false,
    };

    this.$saveBtn = new SaveButton({
      disabled: !this.state.isSaveable,
      type: 'large',
      onClick: this.state.isSaveable ? this.handleClickSaveBtn : () => {},
    }).$dom;

    const setIncomeCategories = setState(userState.myIncomeCategories);
    const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    getMyIncomeCategories().then((res) => setIncomeCategories(res));
    getMyOutcomeCategories().then((res) => setOutcomeCategories(res));
    getMyPayments().then((res) => setPayments(res));

    // 일자
    this.$yearInput = new InputBarInput({}).$dom as HTMLInputElement;
    this.$yearInput.id = 'year-input';
    this.$monthInput = new InputBarInput({}).$dom as HTMLInputElement;
    this.$monthInput.id = 'month-input';
    this.$dateInput = new InputBarInput({}).$dom as HTMLInputElement;
    this.$dateInput.id = 'date-input';
    // 내용
    this.$contentInput = new InputBarInput({}).$dom as HTMLInputElement;
    this.$contentInput.id = 'content-input';
    // 금액
    this.$amountInput = new InputBarInput({}).$dom as HTMLInputElement;
    this.$amountInput.id = 'amount-input';

    // 날짜 체크
    this.$yearInput.addEventListener('input', () => {
      onlyNum(this.$yearInput);
      if (this.$yearInput.value.length === 4) {
        this.$monthInput.focus();
      }
    });
    this.$monthInput.addEventListener('input', () => {
      onlyNum(this.$monthInput);
      if (this.$monthInput.value.length === 1) {
        if (parseInt(this.$monthInput.value) > 1) {
          this.$dateInput.focus();
        }
      } else if (this.$monthInput.value.length === 2) {
        this.$dateInput.focus();
      }
    });
    this.$dateInput.addEventListener('input', () => {
      onlyNum(this.$dateInput);
    });

    this.$dom.addEventListener('input', () => {
      console.log('asdf');
    });

    // 금액 체크
    this.$amountInput.addEventListener('change', () => {
      // 콤마 추가
      const input = this.$amountInput.value.replace(/,/g, '');
      this.$amountInput.value = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    this.$amountInput.addEventListener('input', () => {
      onlyNum(this.$amountInput);
    });

    this.$dom.querySelector('form')?.addEventListener('input', () => {
      console.log('ad');
    });

    if (this.state.paymentType === 'income') {
      this.setState({
        category: (getState(userState.myIncomeCategories) as CategoryType[])[0],
      });
    }

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
    const { paymentType, isBarOpened } = this.state;

    return jsx`
      <div onClick=${() =>
        this.setState({ isBarOpened: true })} class='input-bar ${
      !isBarOpened ? 'close' : ''
    }'>

    ${
      isBarOpened
        ? jsx`<div onClick=${(e: Event) => {
            e.stopPropagation();
            this.setState({ isBarOpened: false });
          }} class='open'></div>`
        : ''
    }

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

        <form class='input-bar__inputs'>
          <div class='input-bar__input'>
            <div class='input-bar__input--label'>일자</div>
            <div class='input-bar__input--content date'>
              ${this.$yearInput}/
              ${this.$monthInput}/
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
        </form>

        <div class='input-bar__price'>
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

      </div>
    `;
  }
}
