import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import SaveButton from '../../atom/SaveButton';
import './style';

export interface InputBarProps {}

export default class InputBar extends Component<InputBarProps> {
  $saveBtn: Element;

  constructor(props: InputBarProps) {
    super(props);

    this.$saveBtn = new SaveButton({
      isActive: true,
      type: 'large',
      onClick: () => {},
    }).$dom;

    this.setDom();
  }
  render() {
    return jsx`
      <div class='input-bar'>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>일자</div>
          <div class='input-bar__input--content'>20210720</div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>분류</div>
          <div class='input-bar__input--content'>20210720</div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>내용</div>
          <div class='input-bar__input--content'>20210720</div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>결제수단</div>
          <div class='input-bar__input--content'>20210720</div>
        </div>
        <div class='input-bar__input'>
          <div class='input-bar__input--label'>금액</div>
          <div class='input-bar__input--content'>20210720</div>
        </div>
        ${this.$saveBtn}
      </div>
    `;
  }
}
