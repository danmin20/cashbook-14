import Component from '@/core/Component';
import jsx from '@/core/jsx';
import SaveButton from '@/Components/atom/SaveButton';
import './style';

export interface InfoProps {
  count: number;
  income: number;
  outcome: number;
  checked: ('income' | 'outcome')[];
  handleCheck: Function;
}

export default class Info extends Component<InfoProps> {
  $incomeButton: Element;
  $outcomeButton: Element;

  handleCheckIncome: Function;
  handleCheckOutcome: Function;

  constructor(props: InfoProps) {
    super(props);

    const { checked, handleCheck } = this.props;

    this.$incomeButton = new SaveButton({
      isActive: checked.find((i) => i === 'income') ? true : false,
      type: 'small',
      onClick: () => {},
    }).$dom;
    this.$outcomeButton = new SaveButton({
      isActive: checked.find((i) => i === 'outcome') ? true : false,
      type: 'small',
      onClick: () => {},
    }).$dom;

    this.handleCheckIncome = () => {
      const newState = [];
      if (!checked.find((i) => i === 'income')) {
        newState.push('income');
      }
      if (checked.find((i) => i === 'outcome')) {
        newState.push('outcome');
      }
      handleCheck(newState);
    };
    this.handleCheckOutcome = () => {
      const newState = [];
      if (!checked.find((i) => i === 'outcome')) {
        newState.push('outcome');
      }
      if (checked.find((i) => i === 'income')) {
        newState.push('income');
      }
      handleCheck(newState);
    };

    this.setDom();
  }

  render() {
    const { count, income, outcome } = this.props;

    return jsx`
      <div class='info-component'>
        <div>
          전체 내역 ${count}건
        </div>

        <div class='buttons'>
          <div class='buttons__button${
            this.props.checked.find((i) => i === 'income') ? ' active' : ''
          }' onClick=${this.handleCheckIncome}>
            ${this.$incomeButton} <span>수입 ${income}</span>
          </div>
          <div class='buttons__button${
            this.props.checked.find((i) => i === 'outcome') ? ' active' : ''
          }' onClick=${this.handleCheckOutcome}>
            ${this.$outcomeButton} <span>지출 ${outcome}</span>
          </div>
        </div>
      </div>
    `;
  }
}
