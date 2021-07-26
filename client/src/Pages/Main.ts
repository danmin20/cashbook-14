import Component from '../core/Component';
import jsx from '../core/jsx';

export default class Main extends Component {
  constructor(props: any) {
    super(props);
    console.log('asdf');

    this.setDom();
  }
  render() {
    return jsx`
        <div>
          <div>
            <button
              class="btn"
              onClick=${() => {
                console.log('asdf');
              }}
            >
            </button>
          </div>
        </div>
      `;
  }
}
