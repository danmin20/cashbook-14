import Header from '@/Components/atom/Header';
import InputBar from '@/Components/organism/InputBar';
import HistoryList from '@/Components/organism/historyList';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import './style';

export default class Main extends Component<PropsType, StateType> {
  $header: Element;
  $inputBar: Element;
  $historyList: Element;

  constructor(props: PropsType) {
    super(props);

    this.$header = new Header({}).$dom;

    this.$historyList = new HistoryList({}).$dom;

    this.$inputBar = new InputBar({}).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div class='wrapper'>
        <div class='top'>
          ${this.$header}
        </div>
        <div class='content'>
          <div class='input-bar-wrapper'>
            ${this.$inputBar}
          </div>
          <div class='content__list'>
            ${this.$historyList}
          </div>
        </div>
      </div>
    `;
  }
}
