import Component, { PropsType, StateType } from '../../core/Component';
import jsx from '../../core/jsx';

export default class Login extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.setDom();
  }

  render() {
    return jsx`
      <div class='login-wrapper'>
        <div style="width: 100%; overflow: hidden">
        <div class="wave -one"></div>
        <div class="wave -two"></div>
        <div class="wave -three"></div>
        </div>
        <div class='top'>
        <a href="http://localhost:3000/api/auth">깃허브 요청</a>

        </div>
      </div>
    `;
  }
}
