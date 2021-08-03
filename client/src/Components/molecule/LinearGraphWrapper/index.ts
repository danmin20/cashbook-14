import { getSumOfAmounts } from '@/api/me';
import LinearGraph from '@/Components/atom/LinearGraph';
import { getState } from '@/core/observer';
import { dateState } from '@/Model';
import dayjs from 'dayjs';
import './style.scss';

// fetching, loading, no data, mount LinearGraph
export default class LinearGraphWrapper {
  $dom: HTMLElement;
  data: number[];
  date: string;
  isLoaded: boolean;
  categoryId: number;

  constructor({ categoryId }: { categoryId: number }) {
    this.categoryId = categoryId;
    this.isLoaded = false;
    this.date = dayjs(getState(dateState) as Date).format('YYYY-MM');
    this.data = [];
    this.$dom = document.createElement('div');
    this.$dom.className = 'linear-graph-wrapper';

    getSumOfAmounts({
      date: this.date,
      categoryId: this.categoryId,
      type: 'outcome',
    }).then((res) => {
      this.data = res;
      this.isLoaded = true;
      this.render();
    });

    this.render();
  }

  render() {
    this.$dom.innerHTML = '';
    const { data, date } = this;
    this.$dom.appendChild(new LinearGraph({ data, date }).$dom);
  }
}
