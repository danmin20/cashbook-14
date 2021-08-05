import Component from '@/core/Component';
import jsx from '@/core/jsx';
import { getState } from '@/core/observer';
import { userState } from '@/Model';
import dayjs from 'dayjs';
import { returnPrice } from '@/utils/util';
import { AllHistorytype, HistoriesType } from '@/shared/type';

interface CalBodyProps {
  firstDay: Date;
  lastDay: Date;
  markToday: number;
  setHistoryDetail: Function;
  histories: HistoriesType[];
}

interface CalBodyState {
  // isLoading: boolean;
  totalIncome: number;
  totalOutcome: number;
}

export default class CalBody extends Component<CalBodyProps, CalBodyState> {
  $detailModal: Element = jsx``;
  openDetail = (date: string) => {
    const histories = (getState(userState.myHistories) as AllHistorytype)
      .histories;
    const arr = histories.find((item) => item.date === date);
    this.props.setHistoryDetail(arr);
  };

  constructor(props: CalBodyProps) {
    super(props);

    this.state = {
      // isLoading: true,
      totalIncome: 0,
      totalOutcome: 0,
    };

    this.setDom();
  }

  willUpdate() {
    this.state = {
      // isLoading: false,
      totalIncome: (getState(userState.myHistories) as AllHistorytype)
        .totalIncome,
      totalOutcome: (getState(userState.myHistories) as AllHistorytype)
        .totalOutcome,
    };
  }

  render() {
    let startCount = false;
    let countDay = 0;

    const { histories, firstDay, lastDay, markToday } = this.props;
    const { totalIncome, totalOutcome } = this.state;

    return jsx`
      <div>
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
                  
                  <div class='cal-box__date'>${
                    startCount ? ++countDay : ''
                  }</div>

                  ${jsx`
                  <div class='cal-box__box' id=${countDay.toString()}>${histories.map(
                    (item) =>
                      // 달력 칸
                      countDay.toString() === dayjs(item.date).format('D')
                        ? jsx`
                      <div class='cal-box__history' onClick=${() => {
                        this.openDetail(dayjs(item.date).format('YYYY-MM-DD'));
                      }}>
                          
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
            총 수입 ${returnPrice(totalIncome)}
            총 지출 ${returnPrice(totalOutcome)}
            </div>
            <div>
            총계 ${returnPrice(totalIncome - totalOutcome)}
            </div>
        </div>
        
      </div>
    `;
  }
}
