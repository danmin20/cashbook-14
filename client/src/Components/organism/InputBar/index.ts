import {
  getMyIncomeCategories,
  getMyOutcomeCategories,
  getMyPayments,
} from '@/api/me';
import Component, { PropsType } from '@/core/Component';
import jsx from '@/core/jsx';
import { userState } from '@/Model';
import { setState } from '@/core/observer';
import { InputBarInput } from '@/Components/organism/InputBar/InputBarInput';
import {
  CategorySelect,
  PaymentSelect,
} from '@/Components/organism/InputBar/InputBarSelect';
import './style';
import { onlyNum } from '@/utils/util';
import { PaymentTypeBtn } from './PaymentTypeBtn';
import { CreateBtn } from './CreateBtn';

export interface InputBarStates {
  isBarOpened: boolean;
  isSaveable: boolean;
}

export default class InputBar extends Component<PropsType, InputBarStates> {
  $saveBtn: Element = jsx``;
  $paymentTypeBtn: Element = jsx``;

  $yearInput: HTMLInputElement;
  $monthInput: HTMLInputElement;
  $dateInput: HTMLInputElement;

  $contentInput: HTMLInputElement;
  $amountInput: HTMLInputElement;
  $categorySelect: Element = jsx``;
  $paymentSelect: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      isBarOpened: false,
      isSaveable: false,
    };

    this.$saveBtn = new CreateBtn({}).$dom;

    const setIncomeCategories = setState(userState.myIncomeCategories);
    const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    getMyIncomeCategories().then((res) => setIncomeCategories(res));
    getMyOutcomeCategories().then((res) => setOutcomeCategories(res));
    getMyPayments().then((res) => setPayments(res));

    // 년
    this.$yearInput = new InputBarInput({ type: 'year' })
      .$dom as HTMLInputElement;
    this.$yearInput.id = 'year-input';
    // 월
    this.$monthInput = new InputBarInput({ type: 'month' })
      .$dom as HTMLInputElement;
    this.$monthInput.id = 'month-input';
    // 일
    this.$dateInput = new InputBarInput({ type: 'date' })
      .$dom as HTMLInputElement;
    this.$dateInput.id = 'date-input';
    // 내용
    this.$contentInput = new InputBarInput({ type: 'content' })
      .$dom as HTMLInputElement;
    this.$contentInput.id = 'content-input';
    // 금액
    this.$amountInput = new InputBarInput({ type: 'amount' })
      .$dom as HTMLInputElement;
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

    // 금액 체크
    this.$amountInput.addEventListener('change', () => {
      // 콤마 추가
      const input = this.$amountInput.value.replace(/,/g, '');
      this.$amountInput.value = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    this.$amountInput.addEventListener('input', () => {
      onlyNum(this.$amountInput);
    });

    // 타입 버튼
    this.$paymentTypeBtn = new PaymentTypeBtn({}).$dom;
    // 분류
    this.$categorySelect = new CategorySelect({}).$dom;
    // 결제수단
    this.$paymentSelect = new PaymentSelect({}).$dom;

    this.setDom();
  }

  render() {
    const { isBarOpened } = this.state;

    return jsx`
      <div onClick=${() => {
        const size = visualViewport.width;
        if (size <= 400) {
          this.setState({ isBarOpened: true });
        }
      }} class='input-bar ${!isBarOpened ? 'close' : ''}'>

        ${
          isBarOpened
            ? jsx`<div onClick=${(e: Event) => {
                e.stopPropagation();
                this.setState({ isBarOpened: false });
              }} class='open'></div>`
            : ''
        }
        ${this.$paymentTypeBtn}

        <div class='input-bar__inputs'>

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

        </div>

        <div class='input-bar__price'>
          <div class='input-bar__input'>
            <div class='input-bar__input--label'>금액</div>
            ${this.$amountInput}
          </div>
          ${this.$saveBtn}
        </div>

      </div>
    `;
  }
}
