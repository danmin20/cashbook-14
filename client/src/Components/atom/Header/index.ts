import { calendar, chart, file, left, right } from '../../../../assets';
import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';

export interface HeaderProps {}

export default class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);

    this.setDom();
  }
  render() {
    return jsx`
      <div class='header'>
        <div class='header__title'>우아한 가계부</div>
        
        <div class='date-controller'>
          <img src=${left} />
          <div class='date'>
            <div class='date__month'>7월</div>
            <div class='date__year'>2021</div>
          </div>
          <img src=${right} />
        </div>
        
        <div class='buttons'>
          <img src=${file} />
          <img src=${calendar} />
          <img src=${chart} />
        </div>
      </div>
    `;
  }
}
