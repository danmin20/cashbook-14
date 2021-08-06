import Component from '@/core/Component';
import jsx from '@/core/jsx';
import ColorPicker from '@/Components/atom/ColorPicker';
import TextInput from '@/Components/atom/TextInput';
import './style';
import { createCategory, deleteCategory } from '@/api/category';
import { createPayment, deletePayment } from '@/api/payment';
import {
  getMyIncomeCategories,
  getMyOutcomeCategories,
  getMyPayments,
} from '@/api/me';
import { getState, setState } from '@/core/observer';
import { historyInputState, userState } from '@/Model';
import { CategoryType, HistoryInputType, PaymentType } from '@/shared/type';
import { deleteHistory } from '@/api/history';
import { $router } from '@/core/router';

export interface AlertProps {
  select: 'category' | 'payment' | 'history';
  type: 'delete' | 'add';
  content: string;
  closeAlert: Function;
  paymentType?: 'income' | 'outcome';
  delItem?: CategoryType | PaymentType | { id: number; content: string };
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

    const { type, select, paymentType, closeAlert, delItem } = this.props;

    this.$textInput = new TextInput({
      invalid: type === 'delete' ? true : false,
      defaultValue:
        select === 'history'
          ? (delItem as { id: number; content: string }).content
          : (delItem as CategoryType | PaymentType)?.name,
    }).$dom;

    this.$colorPicker = new ColorPicker({}).$dom;

    const setIncomeCategories = setState(userState.myIncomeCategories);
    const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    this.handleSubmit = async () => {
      const $input = this.$dom
        .querySelector('#text-input')
        ?.querySelector('input');

      if (select === 'category') {
        try {
          if (type === 'add') {
            // 카테고리 추가
            await createCategory({
              name: $input?.value as string,
              color: this.$colorPicker.querySelector('input')?.value as string,
              type: paymentType as 'income' | 'outcome',
            });
          } else {
            // 카테고리 삭제
            await deleteCategory({ categoryId: delItem?.id as number });

            // 삭제 후 historyInputState 조건부 변경
            const historyInput = getState(
              historyInputState
            ) as HistoryInputType;
            if (historyInput.category.id === delItem?.id) {
              const setHistoryInputState = setState(historyInputState);
              setHistoryInputState({
                category: {
                  id: 0,
                  name: '',
                },
              });
            }
          }
        } finally {
          getMyIncomeCategories()
            .then((res) => setIncomeCategories(res))
            .then(() => closeAlert());
          getMyOutcomeCategories()
            .then((res) => setOutcomeCategories(res))
            .then(() => closeAlert());
        }
      } else if (select === 'payment') {
        try {
          if (type === 'add') {
            // 결제수단 추가
            await createPayment({
              name: $input?.value as string,
            });
          } else {
            // 결제수단 삭제
            await deletePayment({ paymentId: delItem?.id as number });

            // 삭제 후 historyInputState 조건부 변경
            const historyInput = getState(
              historyInputState
            ) as HistoryInputType;
            if (historyInput.category.id === delItem?.id) {
              const setHistoryInputState = setState(historyInputState);
              setHistoryInputState({
                payment: {
                  id: 0,
                  name: '',
                },
              });
            }
          }
        } finally {
          getMyPayments()
            .then((res) => setPayments(res))
            .then(() => closeAlert());
        }
      } else if (select === 'history') {
        deleteHistory({ historyId: delItem?.id as number }).then(() =>
          $router.push('/')
        );
      }
    };

    this.setDom();
  }
  render() {
    const { content, type, select, closeAlert } = this.props;

    return jsx`
      <div class='alert'>
        <div class='alert__header'>${content}${
      select === 'category' && type === 'add' ? this.$colorPicker : ''
    }</div>
        <div id='text-input' onInput=${
          type === 'add' && this.handleDeleteActive
        }>${this.$textInput}</div>

        <div class='buttons'>
          <div onClick='${closeAlert}' class='alert__btn'>취소</div>
          <div id='add' 
            class='alert__btn ${type === 'add' ? 'inactive' : ''} ${
      type === 'delete' ? 'delete' : 'add'
    }' onClick=${this.handleSubmit}>${type === 'delete' ? '삭제' : '등록'}
        </div>
        </div>
      </div>
    `;
  }
}
