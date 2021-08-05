import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { CategoryType, PaymentType } from '@/shared/type';
import CategoryTag from '@/Components/atom/CategoryTag';
import { delete as delBtn } from '@/../assets';
import './style';
import { returnPrice } from '@/utils/util';
import Alert from '../Alert';

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

interface ListState {
  isAlertOpened: boolean;
}

export default class List extends Component<ListProps, ListState> {
  $categoryTag: Element;
  $alert: Element = jsx``;

  openDelAlert = (e: Event, item: { id: number; content: string }) => {
    e.stopPropagation();

    this.$alert = new Alert({
      closeAlert: () => this.setState({ isAlertOpened: false }),
      select: 'history',
      type: 'delete',
      delItem: item,
      content: `해당 내역을 삭제하시겠습니까?`,
    }).$dom;

    this.setState({ isAlertOpened: true });
  };

  constructor(props: ListProps) {
    super(props);

    this.state = {
      isAlertOpened: false,
    };

    this.$categoryTag = new CategoryTag({
      title: this.props.category?.name ?? '-',
      color: this.props.category?.color ?? '#000',
    }).$dom;

    this.setDom();
  }
  render() {
    const { id, type, content, payment, amount, listType, hover, percentage } =
      this.props;

    return jsx`
      <div class='list-component${listType === 'large' ? ' list-large' : ''}${
      hover ? ' list-clickable' : ''
    }'>
        <div class='title'>
          ${this.$categoryTag}<div class='text'>${content}</div>
        </div>
        ${
          payment !== undefined
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
            ? jsx`<img onClick=${(e: Event) =>
                this.openDelAlert(e, {
                  id: id as number,
                  content,
                })} class='del-btn'' src=${delBtn} />`
            : ''
        }

        ${
          this.state.isAlertOpened
            ? jsx`
              <div>
                <div class='modal-container'>
                  ${this.$alert}
                </div>
                <div class='background' />
              </div>
            `
            : ''
        }
      </div>
    `;
  }
}
