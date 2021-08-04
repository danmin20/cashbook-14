import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, subscribe } from '@/core/observer';
import { historyInputState } from '@/Model';
import './style';

export interface SaveButtonProps {
  isActive?: boolean;
  type: 'small' | 'large';
  onClick: Function;
  disabled?: boolean;
}

export default class SaveButton extends Component<SaveButtonProps> {
  constructor(props: SaveButtonProps) {
    super(props);

    this.setDom();
  }
  render() {
    const { isActive, type, onClick, disabled } = this.props;

    return jsx`
      <div onClick=${onClick}
       class='save-button${isActive ? ' active' : ''}
       ${type === 'large' ? ' button-large' : ''}
       ${disabled ? ' disabled' : ''}'>
      </div>
    `;
  }
}
