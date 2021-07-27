import dayjs from 'dayjs';
import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import SaveButton from '../../atom/SaveButton';
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
            ${category || '선택하세요'}
          </div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>분류</div>
          <div class='input-bar__input--content'>20210720</div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>내용</div>
          <div class='input-bar__input--content'>
            <input style='width: 15rem' placeholder='입력하세요' />
          </div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>결제수단</div>
          <div class='input-bar__input--content'>20210720</div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>금액</div>
          <div class='input-bar__input--content amount'>
            <div>${paymentType === 'income' ? '+' : '-'}</div>
            <input placeholder='입력하세요' /> 원
          </div>
        </div>
        ${this.$saveBtn}
      </div>
    `;
  }
}
