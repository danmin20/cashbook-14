import { drop } from '@/../assets';
import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { userState } from '@/Model';
import { CategoryType, PaymentType } from '@/shared/type';
import { getState, subscribe } from '@/core/observer';
import DropDown from '@/Components/atom/Dropdown';
import './style';

interface InputBarSelectProps {
  setContent: Function;
  content: string | null;
  type: 'incomeCategories' | 'outcomeCategories' | 'payments';
}

interface InpuBarSelectState {
  isOpened: boolean;
}

export default class InputBarSelect extends Component<
  InputBarSelectProps,
  InpuBarSelectState
> {
  $dropdown: Element = jsx``;

  constructor(props: InputBarSelectProps) {
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
      isOpened: false,
    };

    this.setDom();
  }

  willUpdate() {
    console.log('update select', getState(userState.myOutcomeCategories));
    this.$dropdown = new DropDown({
      selectType: this.props.type === 'payments' ? 'payment' : 'category',
      items:
        this.props.type === 'incomeCategories'
          ? (getState(userState.myIncomeCategories) as CategoryType[])
          : this.props.type === 'outcomeCategories'
          ? (getState(userState.myOutcomeCategories) as CategoryType[])
          : (getState(userState.myPayments) as PaymentType[]),
      setContent: this.props.setContent,
      paymentType:
        this.props.type !== 'payments' && this.props.type === 'incomeCategories'
          ? 'income'
          : 'outcome' || null,
    }).$dom;
  }

  render() {
    const { isOpened } = this.state;
    const { content } = this.props;

    const handleOpen = () => {
      this.setState({ isOpened: !this.state.isOpened });
    };

    return jsx`
      <div class='select${content ? '' : ' none'}' onClick=${handleOpen}>
        ${content || '선택하세요'}
        <img src=${drop} style='transform: ${
      isOpened ? 'rotate(180deg)' : ''
    }' />
        ${isOpened ? this.$dropdown : ''}
      </div>
    `;
  }
}
