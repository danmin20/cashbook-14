import dayjs from 'dayjs';
import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import SaveButton from '../../atom/SaveButton';
import InputBarInput from './input';
import InputBarSelect from './select';
import './style';

export interface InputBarProps {}

export interface InputBarStates {
  paymentType: 'income' | 'outcome';
  date: string;
  category: string | null;
  content: string | null;
  payment: string | null;
  amount: number | null;
}

export default class InputBar extends Component<InputBarProps, InputBarStates> {
  $saveBtn: Element;
  $dateInput: Element;
  $contentInput: Element;
  $amountInput: Element;
  $categorySelect: Element;
  $paymentSelect: Element;

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

    this.$dateInput = new InputBarInput({
      setContent: (date: string) => this.setState({ date }),
    }).$dom;
    this.$contentInput = new InputBarInput({
      setContent: (content: string) => this.setState({ content }),
    }).$dom;
    this.$amountInput = new InputBarInput({
      setContent: (amount: string) =>
        this.setState({ amount: parseInt(amount) }),
    }).$dom;

    this.$categorySelect = new InputBarSelect({
      content: this.state.category,
      setContent: (category: string) => this.setState({ category }),
      items: ['생활', '식비', '교통'],
    }).$dom;
    this.$paymentSelect = new InputBarSelect({
      content: this.state.payment,
      setContent: (payment: string) => this.setState({ payment }),
      items: ['월급', '용돈', '기타수입'],
    }).$dom;

    this.setDom();
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
