import { github } from '../../../assets';
import Component, { PropsType, StateType } from '../../core/Component';
import jsx from '../../core/jsx';
import './style';

export default class Login extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.setDom();
  }

  render() {
    return jsx`
      <div class='login-wrapper'>
        <div class="wave -one"></div>
        <div class="wave -two"></div>
        <div class="wave -three"></div>

        <div class='title'>
          우아한 가계부
        </div>

        <a class='github' href="http://localhost:3000/api/auth">
          <img src=${github} />
          <div>깃허브로 시작하기</div>
        </a>

      </div>
    `;
  }
}
