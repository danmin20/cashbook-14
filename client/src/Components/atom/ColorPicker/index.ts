import { refresh, delete as delBtn } from '../../../../assets';
import Component, { PropsType } from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';
import { generateRandomColor } from '../../../utils/util';

export interface ColorPickerState {
  color: string;
  isPalatteOpened: boolean;
}

export default class ColorPicker extends Component<
  PropsType,
  ColorPickerState
> {
  generateColor = () => {
    this.setState({
      color: generateRandomColor(),
    });
  };
  handleClickPalatte = (color: string) => {
    this.setState({
      color,
    });
  };
  handleOpenPalatte = (e: Event, value: boolean) => {
    e.stopPropagation();
    this.setState({ isPalatteOpened: value });
  };
  palatte = [
    '#4A6CC3',
    '#4CA1DE',
    '#94D3CC',
    '#4CB8B8',
    '#6ED5EB',
    '#D092E2',
    '#817DCE',
    '#B9D58C',
    '#E6D267',
    '#E2B765',
  ];

  constructor(props: PropsType) {
    super(props);

    this.state = {
      color: generateRandomColor(),
      isPalatteOpened: false,
    };

    this.setDom();
  }
  render() {
    const { color, isPalatteOpened } = this.state;

    return jsx`
      <div class='color-picker'>

        <div onClick=${
          this.generateColor
        } class='refresh-btn' style='background-color: ${color}'>

          <img src=${refresh} />
        </div>
        <input onClick=${(e: Event) =>
          this.handleOpenPalatte(e, true)} value=${color} />

        ${
          isPalatteOpened
            ? jsx`<div class='modal color-palatte' onClick=${(e: Event) =>
                e.stopPropagation()}>
                <img onClick=${(e: Event) =>
                  this.handleOpenPalatte(
                    e,
                    false
                  )} src=${delBtn} class='close-btn' />

          ${this.palatte.map(
            (item) =>
              jsx`<div onClick=${() =>
                this.handleClickPalatte(
                  item
                )} class='color' style='background-color: ${item}'></div>`
          )}
        </div>`
            : ''
        }
      </div>
    `;
  }
}
