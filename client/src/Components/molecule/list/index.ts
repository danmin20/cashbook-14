import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { CategoryType, PaymentType } from '@/shared/type';
import CategoryTag from '@/Components/atom/CategoryTag';
import './style';

export interface ListProps {
  category: CategoryType;
  listType: 'large' | 'small';
  type: 'income' | 'outcome';
  content: string;
  payment: PaymentType;
  amount: number;
  totalIncome?: number;
  totalOutcome?: number;
  date?: string;
}

export default class List extends Component<ListProps> {
  $categoryTag: Element;

  constructor(props: ListProps) {
    super(props);

    this.$categoryTag = new CategoryTag({
      title: this.props.category.name,
      color: this.props.category.color,
    }).$dom;

    this.setDom();
  }
  render() {
    const { type, content, payment, amount, listType } = this.props;

    return jsx`
      <div class='list-component${
        this.props.listType === 'large' ? ' list-large' : ''
      }'>
        <div class='title'>
          ${this.$categoryTag}
          ${content}
        </div>
        <div class='payment'>
          ${listType === 'large' ? payment.name : ''}
        </div>
        <div class='amount${type === 'outcome' ? ' outcome' : ' income'}'>
          ${type === 'outcome' ? '-' : ''}${amount}${
      listType === 'large' ? '원' : ''
    }
        </div>
      </div>
    `;
  }
}
