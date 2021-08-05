import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, setState, subscribe } from '@/core/observer';
import { historyDetailState, userState } from '@/Model';
import { AllHistorytype, HistoriesType } from '@/shared/type';
import CalBody from './calBody';
import { DetailSlide } from './detailSlide';
import './style';

interface CalendarProps {
  firstDay: Date;
  lastDay: Date;
  markToday: number;
}

interface CalendarState {
  historyDetail: HistoriesType | null;
  isDetailModalOpened: boolean;
}

export default class Calendar extends Component<CalendarProps, CalendarState> {
  $detailModal: Element = jsx``;
  $calBody: Element = jsx``;
  histories: HistoriesType[];

  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      historyDetail: null,
      isDetailModalOpened: false,
    };
    this.histories = [];
    const { firstDay, lastDay, markToday } = this.props;

    const setHistoryDetailState = setState(historyDetailState);

    this.$calBody = new CalBody({
      firstDay,
      lastDay,
      markToday,
      setHistoryDetail: (arr: HistoriesType) =>
        setHistoryDetailState({ isModalOpened: true, histories: arr }),
      histories: [],
    }).$dom;

    this.$detailModal = new DetailSlide({}).$dom;

    subscribe(
      userState.myHistories,
      'calendar-histories',
      this.update.bind(this)
    );

    this.setDom();
  }

  willUpdate() {
    const { firstDay, lastDay, markToday } = this.props;
    const histories = (getState(userState.myHistories) as AllHistorytype)
      .histories;

    const setHistoryDetailState = setState(historyDetailState);
    if (histories != this.histories) {
      this.$calBody = new CalBody({
        firstDay,
        lastDay,
        markToday,
        setHistoryDetail: (arr: HistoriesType) =>
          setHistoryDetailState({ isModalOpened: true, histories: arr }),
        histories:
          (getState(userState.myHistories) as AllHistorytype).histories ?? [],
      }).$dom;
      this.histories = histories;
    }
  }

  render() {
    return jsx`
    <div>
      ${this.$calBody}
      ${this.$detailModal}
    </div>
    `;
  }
}
