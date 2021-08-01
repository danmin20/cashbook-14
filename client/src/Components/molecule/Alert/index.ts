import Component from '@/core/Component';
import jsx from '@/core/jsx';
import ColorPicker from '@/Components/atom/ColorPicker';
import TextInput from '@/Components/atom/TextInput';
import './style';

export interface AlertProps {
  select: 'category' | 'payment';
  type: 'delete' | 'add';
  content: string;
  closeAlert: Function;
}

export default class Alert extends Component<AlertProps> {
  $textInput: Element;
  $colorPicker: Element;
  handleDeleteActive = ({ target }: { target: HTMLInputElement }) => {
    if (target.value.length > 0) {
      (this.$dom.querySelector('#add') as HTMLDivElement).classList.remove(
        'inactive'
      );
    } else {
      (this.$dom.querySelector('#add') as HTMLDivElement).classList.add(
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
    const { content, type, select, closeAlert } = this.props;

    return jsx`
      <div class='alert'>
        <div class='alert__header'>${content}${
      select === 'category' ? this.$colorPicker : ''
    }</div>
        <div onInput=${this.handleDeleteActive}>${this.$textInput}</div>

        <div class='buttons'>
          <div onClick='${closeAlert}' class='alert__btn'>취소</div>
          <div id='add' class='alert__btn inactive ${
            type === 'delete' ? 'delete' : 'add'
          }'>${type === 'delete' ? '삭제' : '등록'}
        </div>
        </div>
      </div>
    `;
  }
}
