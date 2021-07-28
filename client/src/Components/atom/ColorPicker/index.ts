import { refresh } from '../../../../assets';
import Component, { PropsType } from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';
import { generateRandomColor } from '../../../utils/util';

export interface ColorPickerState {
  color: string;
}

export default class ColorPicker extends Component<
  PropsType,
  ColorPickerState
> {
  generateColor = () => {
    this.setState({
      color: generateRandomColor(),
    });
    console.log(this.state.color);
  };

  constructor(props: PropsType) {
    super(props);

    this.state = {
      color: generateRandomColor(),
    };

    this.setDom();
  }
  render() {
    return jsx`
      <div class='color-picker'>
        <div onClick=${this.generateColor} class='refresh-btn' style='background-color: ${this.state.color}'>
          <img src=${refresh} />
        </div>
        <input value=${this.state.color} />
      </div>
    `;
  }
}
