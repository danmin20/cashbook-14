import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, subscribe } from '@/core/observer';
import { userState } from '@/Model';
import { AllHistorytype, HistoriesType } from '@/shared/type';
import DetailModal from '../DetailInfo';
import './style';
import CalBody from './calBody';

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

    this.$calBody = new CalBody({
      firstDay,
      lastDay,
      markToday,
      setHistoryDetail: (arr: HistoriesType) =>
        this.setState({ isDetailModalOpened: true, historyDetail: arr }),
      histories: [],
    }).$dom;

    subscribe(
      userState.myHistories,
      'calendar-histories',
      this.update.bind(this)
    );

    this.setDom();
  }

  willMount() {
    this.$detailModal = new DetailModal({
      histories: this.state.historyDetail as HistoriesType,
      handleClose: () => this.setState({ isDetailModalOpened: false }),
    }).$dom;
  }

  willUpdate() {
    const { firstDay, lastDay, markToday } = this.props;
    const histories = (getState(userState.myHistories) as AllHistorytype)
      .histories;
    if (histories != this.histories) {
      this.$calBody = new CalBody({
        firstDay,
        lastDay,
        markToday,
        setHistoryDetail: (arr: HistoriesType) =>
          this.setState({ isDetailModalOpened: true, historyDetail: arr }),
        histories:
          (getState(userState.myHistories) as AllHistorytype).histories ?? [],
      }).$dom;
      this.histories = histories;
    }

    this.$detailModal = new DetailModal({
      histories: this.state.historyDetail as HistoriesType,
      handleClose: () => this.setState({ isDetailModalOpened: false }),
    }).$dom;
  }

  render() {
    const { isDetailModalOpened } = this.state;
    return jsx`
    <div>
      ${this.$calBody}
      ${isDetailModalOpened ? this.$detailModal : ''}
    </div>
    `;
  }
}
