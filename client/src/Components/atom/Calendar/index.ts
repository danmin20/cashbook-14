import Component, { StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, subscribe } from '@/core/observer';
import { userState } from '@/Model';
import dayjs from 'dayjs';
import './style';
import { returnPrice } from '@/utils/util';
import { AllHistorytype, HistoriesType } from '@/shared/type';

interface CalendarProps {
  firstDay: Date;
  lastDay: Date;
  markToday: number;
}

export default class Calendar extends Component<CalendarProps, StateType> {
  histories: HistoriesType[] = [];
  totalIncome: number = 0;
  totalOutcome: number = 0;

  constructor(props: CalendarProps) {
    super(props);

    subscribe(
      userState.myHistories,
      'calendar-histories',
      this.update.bind(this)
    );

    this.setDom();
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
  }

  render() {
    let startCount = false;
    let countDay = 0;

    const { firstDay, lastDay, markToday } = this.props;

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
              
                <div class='cal-box__date'>${startCount ? ++countDay : ''}</div>

                <div id=${countDay.toString()} class='cal-box__history'>
                  ${jsx`<div>${this.histories.map((item) =>
                    countDay.toString() === dayjs(item.date).format('D')
                      ? jsx`
                        <div>
                          <div class="amount income ${
                            item.totalIncome ? '' : 'none'
                          }">
                            ${returnPrice(item.totalIncome)}
                          </div>
                          <div class="amount outcome ${
                            item.totalOutcome ? '' : 'none'
                          }">
                            ${returnPrice(-item.totalOutcome)}
                          </div>
                          <div class="amount">
                            ${returnPrice(item.totalIncome - item.totalOutcome)}
                          </div>
                        </div>`
                      : jsx``
                  )}</div>`}
                </div>
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
