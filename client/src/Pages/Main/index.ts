import Header from '../../Components/atom/Header';
import Info from '../../Components/molecule/Info';
import InputBar from '../../Components/molecule/InputBar';
import List, { ListProps } from '../../Components/molecule/list';
import Component, { PropsType } from '../../core/Component';
import jsx from '../../core/jsx';
import './style';

export interface MainStates {
  date: Date;
  histories: ListProps[];
}

export default class Main extends Component<PropsType, MainStates> {
  $header: Element;
  $inputBar: Element;
  $info: Element;
  $historyList: Element;

  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
      histories: [
        {
          tagId: 'category1',
          tagTitle: '생활',
          type: 'large',
          content: '내용',
          payment: '신한카드',
          amount: 10000000,
        },
      ],
    };

    this.$header = new Header({
      date: this.state.date,
    }).$dom;

    this.$inputBar = new InputBar({}).$dom;

    this.$info = new Info({
      count: 23235235,
      income: 234234,
      outcome: 41451245,
      checked: ['income'],
    }).$dom;

    this.$historyList = document.createElement('div');
    this.state.histories.forEach((history: ListProps) => {
      const $history = new List({
        tagId: history.tagId,
        tagTitle: history.tagTitle,
        type: history.type,
        content: history.content,
        payment: history.payment,
        amount: history.amount,
      }).$dom;
      this.$historyList.append($history);
    });
    console.log(this.$historyList);

    this.setDom();
  }

  render() {
    return jsx`
      <div class='main-page'>
        <div class='top'>
          ${this.$header}
          <div class='input-bar-wrapper'>
            ${this.$inputBar}
          </div>
        </div>
        <div class='list'>
          ${this.$info}
          ${this.$historyList}
        </div>
      </div>
    `;
  }
}
