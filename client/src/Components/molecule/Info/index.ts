import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import SaveButton from '../../atom/SaveButton';
import './style';

export interface InfoProps {
  count: number;
  income: number;
  outcome: number;
  checked: ('income' | 'outcome')[];
}

export default class Info extends Component<InfoProps> {
  $incomeButton: Element;
  $outcomeButton: Element;

  constructor(props: InfoProps) {
    super(props);

    this.$incomeButton = new SaveButton({
      isActive: this.props.checked.find((i) => i === 'income') ? true : false,
      type: 'small',
      onClick: () => {},
    }).$dom;
    this.$outcomeButton = new SaveButton({
      isActive: this.props.checked.find((i) => i === 'outcome') ? true : false,
      type: 'small',
      onClick: () => {},
    }).$dom;

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
          }'>
            ${this.$incomeButton} <span>수입 ${income}</span>
          </div>
          <div class='buttons__button${
            this.props.checked.find((i) => i === 'outcome') ? ' active' : ''
          }'>
            ${this.$outcomeButton} <span>지출 ${outcome}</span>
          </div>
        </div>
      </div>
    `;
  }
}
