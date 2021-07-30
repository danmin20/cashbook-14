import Component, { PropsType, StateType } from '../../core/Component';
import jsx from '../../core/jsx';
import Header from '../../Components/atom/Header';
import PieGraph from '../../Components/atom/PieGraph';

export default class Chart extends Component<PropsType, StateType> {
  $header: Element;
  $pieGraph: Element;

  constructor(props: PropsType) {
    super(props);

    this.$header = new Header({}).$dom;
    this.$pieGraph = new PieGraph({}).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div class='wrapper'>
        <div class='top'>
          ${this.$header}
        </div>

        <div class="chart-wrapper">
          <div class="chart">
            ${this.$pieGraph}
            <div>
              List is here
            </div>
        </div>

      </div>
    `;
  }
}
