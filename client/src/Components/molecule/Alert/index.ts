import Component from '@/core/Component';
import jsx from '@/core/jsx';
import ColorPicker from '@/Components/atom/ColorPicker';
import TextInput from '@/Components/atom/TextInput';
import './style';
import { createCategory } from '@/api/category';
import { createPayment } from '@/api/payment';
import {
  getMyIncomeCategories,
  getMyOutcomeCategories,
  getMyPayments,
} from '@/api/me';
import { setState } from '@/core/observer';
import { userState } from '@/Model';

export interface AlertProps {
  select: 'category' | 'payment';
  type: 'delete' | 'add';
  content: string;
  closeAlert: Function;
  paymentType: 'income' | 'outcome' | null;
}

export default class Alert extends Component<AlertProps> {
  $textInput: Element;
  $colorPicker: Element;
  handleDeleteActive = ({ target }: { target: HTMLInputElement }) => {
    if (target.value.length > 0) {
      (this.$dom.querySelector('#add') as HTMLDivElement).classList.remove(
        'inactive'
      );
    } else {
      (this.$dom.querySelector('#add') as HTMLDivElement).classList.add(
        'inactive'
      );
    }
  };
  handleSubmit: Function;

  constructor(props: AlertProps) {
    super(props);

    const { type, select, paymentType, closeAlert } = this.props;

    this.$textInput = new TextInput({
      invalid: type === 'delete' ? true : false,
    }).$dom;

    this.$colorPicker = new ColorPicker({}).$dom;

    const setIncomeCategories = setState(userState.myIncomeCategories);
    const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    this.handleSubmit = () => {
      const $input = this.$dom
        .querySelector('#text-input')
        ?.querySelector('input');

      if (select === 'category') {
        if (type === 'add') {
          // 카테고리 추가
          createCategory({
            name: $input?.value as string,
            color: this.$colorPicker.querySelector('input')?.value as string,
            type: paymentType as 'income' | 'outcome',
          })
            .then(() => {
              if (paymentType === 'income') {
                getMyIncomeCategories().then((res) => setIncomeCategories(res));
              } else if (paymentType === 'outcome') {
                getMyOutcomeCategories().then((res) =>
                  setOutcomeCategories(res)
                );
              }
            })
            .then(() => closeAlert());
        } else {
          // 카테고리 삭제
        }
      } else {
        if (type === 'add') {
          // 결제수단 추가
          createPayment({
            name: $input?.value as string,
          })
            .then(() => {
              getMyPayments().then((res) => setPayments(res));
            })
            .then(() => closeAlert());
        } else {
          // 결제수단 삭제
        }
      }
    };

    this.setDom();
  }
  render() {
    const { content, type, select, closeAlert } = this.props;

    return jsx`
      <div class='alert'>
        <div class='alert__header'>${content}${
      select === 'category' ? this.$colorPicker : ''
    }</div>
        <div id='text-input' onInput=${this.handleDeleteActive}>${
      this.$textInput
    }</div>

        <div class='buttons'>
          <div onClick='${closeAlert}' class='alert__btn'>취소</div>
          <div id='add' class='alert__btn inactive ${
            type === 'delete' ? 'delete' : 'add'
          }' onClick=${this.handleSubmit}>${type === 'delete' ? '삭제' : '등록'}
        </div>
        </div>
      </div>
    `;
  }
}
