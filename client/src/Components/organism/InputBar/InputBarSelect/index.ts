import { drop } from '@/../assets';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { historyInputState, userState } from '@/Model';
import { CategoryType, HistoryInputType, PaymentType } from '@/shared/type';
import { getState, setState, subscribe } from '@/core/observer';
import DropDown from '@/Components/molecule/Dropdown';
import './style';

// interface InputBarSelectProps {
//   setContent: Function;
//   content: string | null;
// }

interface InpuBarSelectState {
  isOpened: boolean;
}

class InputBarSelect extends Component<PropsType, InpuBarSelectState> {
  $dropdown: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      isOpened: false,
    };

    this.setDom();
  }

  render() {
    return jsx``;
  }
}

export class CategorySelect extends Component<PropsType, StateType> {
  $incomeCategorySelect: Element = jsx``;
  $outcomeCategorySelect: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    subscribe(historyInputState, 'category-select', this.update.bind(this));

    this.$incomeCategorySelect = new IncomeCategorySelect({}).$dom;
    this.$outcomeCategorySelect = new OutcomeCategorySelect({}).$dom;

    this.setDom();
  }

  render() {
    const paymentType = (getState(historyInputState) as HistoryInputType)
      .paymentType;
    return paymentType === 'income'
      ? this.$incomeCategorySelect
      : this.$outcomeCategorySelect;
  }
}

export class IncomeCategorySelect extends InputBarSelect {
  $dropdown: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    subscribe(
      userState.myIncomeCategories,
      'input-bar-incomecategories',
      this.update.bind(this)
    );
    subscribe(historyInputState, 'incomecategories', this.update.bind(this));
  }

  willUpdate() {
    const handleSetState = setState(historyInputState);

    this.$dropdown = new DropDown({
      selectType: 'category',
      items: getState(userState.myIncomeCategories) as CategoryType[],
      setContent: (category: { id: number; name: string }) =>
        handleSetState((oldState: HistoryInputType) => {
          return { ...oldState, category };
        }),
      paymentType: 'income',
    }).$dom;
  }

  render() {
    const { isOpened } = this.state;
    // const { content } = this.props;

    const handleOpen = () => {
      this.setState({ isOpened: !this.state.isOpened });
    };

    const content = (getState(historyInputState) as HistoryInputType).category
      .name;

    return jsx`
      <div class='select${content ? '' : ' none'}' onClick=${handleOpen}>
        ${content || '선택하세요'}
        <img class='drop-icon' src=${drop} style='transform: ${
      isOpened ? 'rotate(180deg)' : ''
    }' />
        ${isOpened ? this.$dropdown : ''}
      </div>
    `;
  }
}

export class OutcomeCategorySelect extends InputBarSelect {
  $dropdown: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    subscribe(
      userState.myOutcomeCategories,
      'input-bar-outcomecategories',
      this.update.bind(this)
    );
    subscribe(historyInputState, 'outcomecategories', this.update.bind(this));
  }

  willUpdate() {
    const handleSetState = setState(historyInputState);

    this.$dropdown = new DropDown({
      selectType: 'category',
      items: getState(userState.myOutcomeCategories) as CategoryType[],
      setContent: (category: { id: number; name: string }) =>
        handleSetState((oldState: HistoryInputType) => {
          return { ...oldState, category };
        }),
      paymentType: 'outcome',
    }).$dom;
  }

  render() {
    const { isOpened } = this.state;
    // const { content } = this.props;

    const handleOpen = () => {
      this.setState({ isOpened: !this.state.isOpened });
    };

    const content = (getState(historyInputState) as HistoryInputType).category
      .name;

    return jsx`
      <div class='select${content ? '' : ' none'}' onClick=${handleOpen}>
        ${content || '선택하세요'}
        <img class='drop-icon' src=${drop} style='transform: ${
      isOpened ? 'rotate(180deg)' : ''
    }' />
        ${isOpened ? this.$dropdown : ''}
      </div>
    `;
  }
}
export class PaymentSelect extends InputBarSelect {
  $dropdown: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    subscribe(
      userState.myPayments,
      'input-bar-payments',
      this.update.bind(this)
    );
    subscribe(historyInputState, 'payments', this.update.bind(this));
  }

  willUpdate() {
    const handleSetState = setState(historyInputState);

    this.$dropdown = new DropDown({
      selectType: 'payment',
      items: getState(userState.myPayments) as PaymentType[],
      setContent: (payment: { id: number; name: string }) =>
        handleSetState((oldState: HistoryInputType) => {
          return { ...oldState, payment };
        }),
    }).$dom;
  }

  render() {
    const { isOpened } = this.state;
    // const { content } = this.props;

    const handleOpen = () => {
      this.setState({ isOpened: true });
    };

    const content = (getState(historyInputState) as HistoryInputType).payment
      .name;

    return jsx`
      <div class='select${content ? '' : ' none'}' onClick=${handleOpen}>
        ${content || '선택하세요'}
        <img class='drop-icon' src=${drop} style='transform: ${
      isOpened ? 'rotate(180deg)' : ''
    }' />
        ${isOpened ? this.$dropdown : ''}
      </div>
    `;
  }
}
