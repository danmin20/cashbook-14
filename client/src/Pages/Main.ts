import SaveButton, { SaveButtonProps } from '../Components/atom/SaveButton';
import Component, { ComponentId } from '../core/Component';
import jsx from '../core/jsx';

export default class Main extends Component {
  $saveBtn: any;

  constructor(props: any) {
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
      <div>
       ${this.$saveBtn}
        <button
          onClick=${() => {
            console.log('click');
          }}
        >asdf
        </button>
      </div>
    `;
  }
}
