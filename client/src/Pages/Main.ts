import Component from '../core/Component';
import jsx from '../core/jsx';

export default class Main extends Component {
  constructor(props: any) {
    super(props);

    this.setDom();
  }
  render() {
    return jsx`
      <div id="asdf">
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
