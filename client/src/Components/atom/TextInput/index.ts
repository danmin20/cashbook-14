import Component from '@/core/Component';
import jsx from '@/core/jsx';
import './style';

export interface TextInputProps {
  invalid: boolean;
  defaultValue?: string;
}

export default class TextInput extends Component<TextInputProps> {
  constructor(props: TextInputProps) {
    super(props);

    this.setDom();
  }
  didMount() {
    if (!this.props.invalid) this.$dom.removeAttribute('disabled');
  }
  render() {
    const { invalid, defaultValue } = this.props;

    return jsx`
      <input value=${
        invalid ? defaultValue : ''
      } autocomplete='off' class='text-input' placeholder='입력하세요' disabled />
    `;
  }
}
