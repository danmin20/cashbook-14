import { drop } from '@/../assets';
import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { userState } from '@/Model';
import { CategoryType, PaymentType } from '@/shared/type';
import { getState, subscribe } from '@/core/observer';
import DropDown from '@/Components/molecule/Dropdown';
import './style';

interface InputBarSelectProps {
  setContent: Function;
  content: string | null;
  type: 'incomeCategories' | 'outcomeCategories' | 'payments';
}

interface InpuBarSelectState {
  isOpened: boolean;
}

class InputBarSelect extends Component<
  InputBarSelectProps,
  InpuBarSelectState
> {
  $dropdown: Element = jsx``;

  constructor(props: InputBarSelectProps) {
    super(props);

    this.state = {
      isOpened: false,
    };

    this.setDom();
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

export class CategorySelect extends InputBarSelect {
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
  }

  willUpdate() {
    this.$dropdown = new DropDown({
      selectType: 'category',
      items:
        this.props.type === 'incomeCategories'
          ? (getState(userState.myIncomeCategories) as CategoryType[])
          : (getState(userState.myOutcomeCategories) as CategoryType[]),
      setContent: this.props.setContent,
      paymentType:
        this.props.type === 'incomeCategories' ? 'income' : 'outcome',
    }).$dom;
  }
}
export class PaymentSelect extends InputBarSelect {
  $dropdown: Element = jsx``;

  constructor(props: InputBarSelectProps) {
    super(props);

    subscribe(
      userState.myPayments,
      'input-bar-payments',
      this.update.bind(this)
    );
  }

  willUpdate() {
    this.$dropdown = new DropDown({
      selectType: 'payment',
      items: getState(userState.myPayments) as PaymentType[],
      setContent: this.props.setContent,
    }).$dom;
  }
}
