import { checkLarge, checkSmall } from '../../../../assets';
import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';

export interface SaveButtonProps {
  isActive: boolean;
  type: 'small' | 'large';
  onClick: Function;
}

export default class SaveButton extends Component<SaveButtonProps> {
  constructor(props: SaveButtonProps) {
    super(props);

    this.setDom();
  }
  render() {
    const { isActive, type, onClick } = this.props;

    return jsx`
      <div onClick=${onClick} class='save-button${isActive ? ' active' : ''}${
      type === 'large' ? ' button-large' : ''
    }'>
        <img src=${type === 'small' ? checkSmall : checkLarge} />
      </div>
    `;
  }
}
