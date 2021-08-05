import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { CategoryType, PaymentType } from '@/shared/type';
import CategoryTag from '@/Components/atom/CategoryTag';
import { delete as delBtn } from '@/../assets';
import './style';
import { returnPrice } from '@/utils/util';
import { removeHistory } from '@/api/history';
import { $router } from '@/core/router';

export interface ListProps {
  id?: number;
  category: CategoryType;
  listType: 'large' | 'small';
  type: 'income' | 'outcome';
  content: string;
  payment?: PaymentType;
  amount: number;
  totalIncome?: number;
  totalOutcome?: number;
  date?: string;
  hover?: boolean;
  percentage?: number;
}

export default class List extends Component<ListProps> {
  $categoryTag: Element;

  handleRemove = () => {
    const { id } = this.props;
    removeHistory({ historyId: id as number }).then(() => $router.push('/'));
  };

  constructor(props: ListProps) {
    super(props);

    this.$categoryTag = new CategoryTag({
      title: this.props.category.name,
      color: this.props.category.color,
    }).$dom;

    this.setDom();
  }
  render() {
    const { type, content, payment, amount, listType, hover, percentage } =
      this.props;

    return jsx`
      <div class='list-component${listType === 'large' ? ' list-large' : ''}${
      hover ? ' list-clickable' : ''
    }'>
        <div class='title'>
          ${this.$categoryTag}${content}
        </div>
        ${
          payment
            ? jsx`
              <div class='payment'>
                ${listType === 'large' ? payment?.name : ''}
              </div>
            `
            : ''
        }
        ${
          percentage
            ? jsx`
              <div class='percentage'>
                <div class='progress-bar' style='width: ${
                  percentage * 100
                }%; background-color: ${this.props.category.color}'>
                </div>
              </div>
            `
            : ''
        }
        <div class='amount${type === 'outcome' ? ' outcome' : ' income'}'>
          ${type === 'outcome' ? '-' : ''}${returnPrice(amount)}${
      listType === 'large' ? '원' : ''
    }
        </div>

        ${
          location.pathname === '/'
            ? jsx`<img onClick=${this.handleRemove} class='del-btn'' src=${delBtn} />`
            : ''
        }
      </div>
    `;
  }
}
