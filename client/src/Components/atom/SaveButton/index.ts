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

    if (this.props.type === 'large') {
      subscribe(historyInputState, 'save-button', this.update.bind(this));
    }

    this.setDom();
  }
  willUpdate() {
    const a = getState(historyInputState);
  }
  render() {
    const { isActive, type, onClick, disabled } = this.props;

    console.log('disabled', disabled);

    return jsx`
      <div onClick=${onClick}
       class='save-button${isActive ? ' active' : ''}
       ${type === 'large' ? ' button-large' : ''}
       ${disabled ? ' disabled' : ''}'>
      </div>
    `;
  }
}
