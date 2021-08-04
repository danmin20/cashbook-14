import jsx from '@/core/jsx';
import './style';
import { GroupedHistoriesByCategory } from '@/shared/type';
import PieGraph from '@/Components/atom/PieGraph';
import LinearGraphWrapper from '../LinearGraphWrapper';
import List from '@/Components/molecule/list';
import { returnPrice } from '@/utils/util';

interface ChartProps {
  data: GroupedHistoriesByCategory[];
}

// [파이 차트]와 [리스트]를 보인다. OK
// 리스트아이템 클릭 시 [선형 차트]와 [리스트]를 새로 만들어 렌더링한다?? ㅇㅋ
// isOpened를 상태로 가져야한다. ㅇㅋ

// TODO: empty data 렌더링

export default class Chart {
  data: GroupedHistoriesByCategory[];
  $pieGraph: Element;
  totalOutcome: number;
  isOpened: boolean;
  selectedIndex: number;
  $dom: Element;

  constructor(props: ChartProps) {
    this.isOpened = false;
    this.selectedIndex = -1;
    this.data = props.data;

    this.totalOutcome = this.data.reduce(
      (prev, value) => prev + value.amount,
      0
    );
    this.$pieGraph = new PieGraph({ data: this.data }).$dom;

    this.$dom = document.createElement('div');
    this.addListener();
    this.render();
  }

  addListener() {
    this.$dom.addEventListener('click', this.handleClickItem.bind(this));
  }

  handleClickItem(event: any) {
    const target = event.target.closest('.chart-item');
    if (!target) {
      return;
    }

    this.isOpened = true;
    this.selectedIndex = +target.dataset.index; // dirtyindex
    this.update();
  }

  update() {
    const $oldLinear = this.$dom.querySelector('.linear-container');
    const $oldDayList = this.$dom.querySelector('.day-list-container');

    $oldLinear?.remove();
    $oldDayList?.remove();

    const $chartWrapper = this.$dom.querySelector('.chart-wrapper');

    $chartWrapper?.appendChild(jsx`
    <div class="paper linear-container">
      <div class="title-active">
      ${this.data[this.selectedIndex].category} 카테고리 소비 추이
      </div>

      <div>
        ${
          new LinearGraphWrapper({
            categoryId: this.data[this.selectedIndex].categoryId,
          }).$dom
        }
      </div>
    </div>
    `);
    $chartWrapper?.appendChild(jsx`
    <div class="day-list-container">
      ${this.data[this.selectedIndex].histories.map((history) => {
        return jsx`<div>${
          new List({
            category: {
              name: history.category.name,
              color: history.category.color,
            },
            listType: 'large',
            type: 'outcome',
            content: history.content,
            amount: history.amount,
            payment: history.payment,
          }).$dom
        }</div>`;
      })}
    </div>`);
  }

  render() {
    this.$dom.innerHTML = '';
    this.$dom.appendChild(
      jsx`
      <div class="chart-wrapper">
      <div class="chart paper">
          ${this.$pieGraph}
          <div class="chart-list">
            <div class="title-active">
                이번 달 지출 금액 ${returnPrice(this.totalOutcome)}원
            </div>
            ${this.data.map((data, index) => {
              // 모듈로 분리해도 될듯
              const itemList = document.createElement('div');
              itemList.className = 'chart-item';
              itemList.dataset.index = index.toString();
              itemList.appendChild(
                new List({
                  category: {
                    name: data.category,
                    color: data.color,
                  },
                  listType: 'small',
                  type: 'outcome',
                  content: `${Math.floor(
                    (data.amount / this.totalOutcome) * 100
                  )}%`,
                  amount: data.amount,
                  hover: true,
                }).$dom
              );
              return itemList;
            })}
          </div>
      </div>
  </div>`
    );
  }
}

// interface ChartState {
//   isOpened: boolean;
//   selectedIndex: number;
// }

// export default class Chart extends Component<ChartProps, ChartState> {
//   data: GroupedHistoriesByCategory[];
//   $pieGraph: Element;
//   totalOutcome: number;

//   constructor(props: ChartProps) {
//     super(props);

//     this.state = { isOpened: false, selectedIndex: -1 };
//     this.data = props.data;

//     this.totalOutcome = this.data.reduce(
//       (prev, value) => prev + value.amount,
//       0
//     );
//     this.$pieGraph = new PieGraph({ data: this.data }).$dom;

//     this.setDom();
//   }

//   didMount() {
//     this.$dom.addEventListener('click', this.handleClickItem.bind(this));
//   }

//   handleClickItem(e: any) {
//     const target = e.target.closest('.chart-item');
//     if (!target) {
//       return;
//     }

//     this.setState({
//       isOpened: true,
//       selectedIndex: +target.dataset.index.split(':')[1], // dirtyindex
//     });
//   }

//   render() {
//     const { isOpened, selectedIndex } = this.state;

//     return jsx`
//         <div class="chart-wrapper">
//             <div class="chart paper">
//                 ${this.$pieGraph}
//                 <div>
//                   <div class="title-active">
//                       이번 달 지출 금액 ${returnPrice(this.totalOutcome)}원
//                   </div>
//                   ${this.data.map((data, index) => {
//                     // 모듈로 분리해도 될듯
//                     return jsx`
//                       <div class="chart-item" data-index=${index}>
//                         ${
//                           new List({
//                             category: {
//                               name: data.category,
//                               color: data.color,
//                             },
//                             listType: 'small',
//                             type: 'outcome',
//                             content: `${Math.floor(
//                               (data.amount / this.totalOutcome) * 100
//                             )}%`,
//                             amount: data.amount,
//                             hover: true,
//                           }).$dom
//                         }
//                         </div>
//                       `;
//                   })}
//                 </div>
//             </div>

//             ${
//               isOpened
//                 ? jsx`
//                 <div class="paper">
//                   <div class="title-active">
//                   ${this.data[selectedIndex].category} 카테고리 소비 추이
//                   </div>

//                   <div>
//                     ${
//                       // new LinearGraph({}).$dom
//                       ''
//                     }
//                   </div>
//                 </div>

//                 <div>
//                   ${
//                     ''
//                     //   this.data[selectedIndex].histories.map((history) => {
//                     //   return jsx`<div>${
//                     //     new List({
//                     //       category: {
//                     //         name: history.category.name,
//                     //         color: history.category.color,
//                     //       },
//                     //       listType: 'large',
//                     //       type: 'outcome',
//                     //       content: history.content,
//                     //       amount: history.amount,
//                     //     }).$dom
//                     //   }</div>`;
//                     // })
//                   }
//                 </div>
//                 `
//                 : ''
//             }

//             ${
//               isOpened
//                 ? jsx`
//                 <div>
//                   ${this.data[selectedIndex].histories.map((history) => {
//                     return jsx`<div>${
//                       new List({
//                         category: {
//                           name: history.category.name,
//                           color: history.category.color,
//                         },
//                         listType: 'large',
//                         type: 'outcome',
//                         content: history.content,
//                         amount: history.amount,
//                       }).$dom
//                     }</div>`;
//                   })}
//                 </div>
//                 `
//                 : ''
//             }
//         </div>
//     `;
//   }
// }
