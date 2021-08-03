import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, subscribe } from '@/core/observer';
import { userState } from '@/Model';
import dayjs from 'dayjs';
import { returnPrice } from '@/utils/util';
import { AllHistorytype, HistoriesType } from '@/shared/type';
import { getMyMonthlyHistory } from '@/api/me';
import DetailModal from '../DetailInfo';
import './style';

interface CalendarProps {
  firstDay: Date;
  lastDay: Date;
  markToday: number;
}

interface CalendarState {
  historyDetail: AllHistorytype | null;
  isLoading: boolean;
  isDetailModalOpened: boolean;
}

export default class Calendar extends Component<CalendarProps, CalendarState> {
  $detailModal: Element = jsx``;

  histories: HistoriesType[] = [];
  totalIncome: number = 0;
  totalOutcome: number = 0;
  openDetail = (date: string) => {
    getMyMonthlyHistory({ YYYYMM: date })
      .then((res) => this.setState({ historyDetail: res }))
      .then(() => this.setState({ isDetailModalOpened: true }));
  };

  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      historyDetail: null,
      isLoading: true,
      isDetailModalOpened: false,
    };

    subscribe(
      userState.myHistories,
      'calendar-histories',
      this.update.bind(this)
    );

    this.setDom();
  }

  willMount() {
    this.$detailModal = new DetailModal({
      histories: this.state.historyDetail as AllHistorytype,
      handleClose: () => this.setState({ isDetailModalOpened: false }),
    }).$dom;
  }

  willUpdate() {
    this.histories = (
      getState(userState.myHistories) as AllHistorytype
    ).histories;

    this.totalIncome = (
      getState(userState.myHistories) as AllHistorytype
    ).totalIncome;
    this.totalOutcome = (
      getState(userState.myHistories) as AllHistorytype
    ).totalOutcome;

    this.setState({ isLoading: false });
  }

  render() {
    let startCount = false;
    let countDay = 0;

    const { isLoading, isDetailModalOpened } = this.state;
    const { firstDay, lastDay, markToday } = this.props;

    return jsx`
    <div>
      ${
        isLoading
          ? jsx`
            <div class='cal-loading'>
              <div class="loader" />
            </div>`
          : ''
      }

        ${isDetailModalOpened ? this.$detailModal : ''}

      ${[...Array(6).keys()].map(
        (i) =>
          jsx`<div class='${lastDay.getDate() > countDay ? 'cal-line' : ''}'>
            ${[...Array(7).keys()].map((j) => {
              if (i === 0 && !startCount && j === firstDay.getDay()) {
                startCount = true;
              }

              const innerHTML = jsx`<div class='cal-box${
                markToday === countDay + 1 ? ' today' : ''
              }'>
                
                <div class='cal-box__date'>${startCount ? ++countDay : ''}</div>

                ${jsx`
                <div class='cal-box__box' id=${countDay.toString()}>${this.histories.map(
                  (item) =>
                    // 달력 칸
                    countDay.toString() === dayjs(item.date).format('D')
                      ? jsx`
                      <div class='cal-box__history' onClick=${() =>
                        this.openDetail(dayjs(item.date).format('YYYY-MM-DD'))}>
                        
                        <div class="amount income ${
                          item.totalIncome ? '' : 'none'
                        }">
                          ${returnPrice(item.totalIncome)}
                        </div>
                        <div class="${
                          item.totalIncome ? 'amount-mobile income' : ''
                        }"></div>

                        <div class="amount outcome ${
                          item.totalOutcome ? '' : 'none'
                        }">
                          ${returnPrice(-item.totalOutcome)}
                        </div>
                        <div class="${
                          item.totalOutcome ? 'amount-mobile outcome' : ''
                        }"></div>

                        <div class="amount">
                          ${returnPrice(item.totalIncome - item.totalOutcome)}
                        </div>
                      </div>`
                      : jsx``
                )}
                </div>`}

                </div>`;

              if (countDay === lastDay.getDate()) {
                startCount = false;
              }
              return innerHTML;
            })}
          </div>`
      )}

      <div class='footer'>
        <div>
          총 수입 ${returnPrice(this.totalIncome)}
          총 지출 ${returnPrice(this.totalOutcome)}
        </div>
        <div>
          총계 ${returnPrice(this.totalIncome - this.totalOutcome)}
        </div>
      </div>
      
    </div>
    `;
  }
}
