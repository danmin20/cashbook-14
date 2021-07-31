import { drop } from '../../../../assets';
import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import { CategoryType, PaymentType } from '../../../shared/type';
import DropDown from '../Dropdown';
import './style';

export interface InputBarSelectProps {
  setContent: Function;
  content: string | null;
  items: CategoryType[] | PaymentType[];
}

export default class InputBarSelect extends Component<
  InputBarSelectProps,
  { isOpened: boolean }
> {
  $dropdown: Element;

  constructor(props: InputBarSelectProps) {
    super(props);

    this.state = {
      isOpened: false,
    };

    this.$dropdown = new DropDown({
      items: this.props.items,
    }).$dom;

    this.setDom();
  }

  render() {
    const { setContent, content } = this.props;

    const handleOpen = () => {
      this.setState({ isOpened: !this.state.isOpened });
    };

    return jsx`
      <div class='select${content ? '' : ' none'}' onClick=${handleOpen}>
        ${content || '선택하세요'}
        <img src=${drop} />
        ${this.state.isOpened ? this.$dropdown : ''}
      </div>
    `;
  }
}
