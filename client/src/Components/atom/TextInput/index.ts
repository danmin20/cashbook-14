import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';

export interface TextInputProps {
  invalid?: boolean;
}

export default class TextInput extends Component<TextInputProps> {
  constructor(props: TextInputProps) {
    super(props);

    this.setDom();
  }
  render() {
    const { invalid = false } = this.props;

    return jsx`
      <input autocomplete='off' class='text-input' placeholder='입력하세요' ${
        invalid ? 'disabled' : ''
      } />
    `;
  }
}