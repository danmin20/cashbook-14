import DayList, { DayListProps } from '../../Components/atom/DayList';
import Header from '../../Components/atom/Header';
import Alert from '../../Components/molecule/Alert';
import Info from '../../Components/molecule/Info';
import InputBar from '../../Components/molecule/InputBar';
import List, { ListProps } from '../../Components/molecule/list';
import Component, { PropsType } from '../../core/Component';
import jsx from '../../core/jsx';
import axios from 'axios';
import './style';

export interface MainStates {
  // 전역 상태로 넣기
  date: Date;
  histories: {
    day: DayListProps;
    list: ListProps[];
  }[];
}

export default class Main extends Component<PropsType, MainStates> {
  $header: Element;
  $inputBar: Element;
  $info: Element;
  $historyList: Element;
  $alert: Element;
  $categoryAlert: Element;
  handleLogin = async () => {
    const { data } = await axios.get('http://localhost:3000/api/githublogin');
    console.log(data);
    // await axios
    //   .post('http://localhost:3000/api/auth/token', {
    //     code: data,
    //   })
    //   .then(({ data: aa }) => {
    //     console.log('ddd', aa);
    //   });

    // const { data: result } = axios.post(
    //   'https://github.com/login/oauth/access_token',
    //   {
    //     client_id: 'd0c1439770278d8073c1',
    //     client_secret: '18580c89854b783ae43c24ae513b38917e85c6ed',
    //   }
    // );
  };

  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
      histories: [
        {
          day: {
            date: new Date(),
            income: 99999,
            outcome: 999999,
          },
          list: [
            {
              tagId: 'category1',
              tagTitle: '생활',
              type: 'large',
              content: '내용',
              payment: '신한카드',
              paymentType: 'outcome',
              amount: 10000000,
            },
            {
              tagId: 'category8',
              tagTitle: '월급',
              type: 'large',
              content: '내용',
              payment: '현금',
              paymentType: 'income',
              amount: 10000000,
            },
          ],
        },
      ],
    };

    this.$header = new Header({}).$dom;

    this.$inputBar = new InputBar({}).$dom;

    this.$info = new Info({
      count: 23235235,
      income: 234234,
      outcome: 41451245,
      checked: ['income'],
    }).$dom;

    this.$historyList = document.createElement('div');
    this.state.histories.forEach(({ day, list }) => {
      const $dayList = new DayList({
        date: day.date,
        income: day.income,
        outcome: day.outcome,
      }).$dom;
      this.$historyList.append($dayList);

      list.forEach((history: ListProps) => {
        const $history = new List({
          tagId: history.tagId,
          tagTitle: history.tagTitle,
          type: history.type,
          content: history.content,
          payment: history.payment,
          paymentType: history.paymentType,
          amount: history.amount,
        }).$dom;
        this.$historyList.append($history);
      });
    });

    this.$alert = new Alert({
      select: 'payment',
      type: 'add',
      content: 'asdf',
    }).$dom;
    this.$categoryAlert = new Alert({
      select: 'category',
      type: 'add',
      content: 'asdf',
    }).$dom;

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
          ${this.$info}
          <div class='content__list'>
            ${this.$historyList}
            ${this.$categoryAlert}
          </div>
          <a href="http://localhost:3000/api/auth">깃허브 요청</a>
          <button onClick=${this.handleLogin}>github</button>
        </div>
      </div>
    `;
  }
}
