import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import ColorPicker from '../../atom/ColorPicker';
import TextInput from '../../atom/TextInput';
import './style';

export interface AlertProps {
  select: 'category' | 'payment';
  type: 'delete' | 'add';
  content: string;
}

export default class Alert extends Component<AlertProps> {
  $textInput: Element;
  $colorPicker: Element;
  handleDeleteActive = ({ target }: { target: HTMLInputElement }) => {
    if (target.value.length > 0) {
      (this.$dom.querySelector('#close') as HTMLDivElement).classList.remove(
        'inactive'
      );
    } else {
      (this.$dom.querySelector('#close') as HTMLDivElement).classList.add(
        'inactive'
      );
    }
  };

  constructor(props: AlertProps) {
    super(props);

    this.$textInput = new TextInput({
      invalid: this.props.type === 'delete' ? true : false,
    }).$dom;

    this.$colorPicker = new ColorPicker({}).$dom;

    this.setDom();
  }
  render() {
    const { content, type } = this.props;

    return jsx`
      <div class='alert'>
        <div class='alert__header'>${content}${this.$colorPicker}</div>
        <div onInput=${this.handleDeleteActive}>${this.$textInput}</div>

        <div class='buttons'>
          <div id='close' class='alert__btn inactive'>취소</div>
          <div class='alert__btn ${type === 'delete' ? 'delete' : 'add'}'>${
      type === 'delete' ? '삭제' : '등록'
    }
        </div>
        </div>
      </div>
    `;
  }
}
