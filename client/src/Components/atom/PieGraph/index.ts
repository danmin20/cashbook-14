import './style';

const mock = [
  {
    category: '생활',
    amount: 50000,
    color: '#4A6CC3',
  },
  {
    category: '의료/건강',
    amount: 30000,
    color: '#D092E2',
  },
  {
    category: '쇼핑/뷰티',
    amount: 10000,
    color: '#4CB8B8',
  },
  {
    category: '교통',
    amount: 3009,
    color: '#E2B765',
  },
];

export default class PieGraph {
  data: any; // 상위 콘텍스트(api 또는 component)의 환경에 따라 변경 가능하기 때문에 우선은 any로 지정
  $wrapper: HTMLElement;
  $dom: HTMLElement;
  $canvas: HTMLCanvasElement;
  cur: number;
  end: number;

  constructor({ data }) {
    this.data = data;
    // constructor({}) {
    // this.data = mock;

    this.$canvas = document.createElement('canvas');
    this.$canvas.className = 'pie';
    this.$canvas.width = 512;
    this.$canvas.height = 512;

    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'pie-wrapper';
    this.$wrapper.appendChild(this.$canvas);

    this.$dom = document.createElement('div');
    this.$dom.appendChild(this.$wrapper);

    this.cur = 1;
    this.end = 100;
    window.requestAnimationFrame(this.render.bind(this));
  }

  render() {
    const ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    const x = this.$canvas.width / 2;
    const y = this.$canvas.height / 2;
    const radius = 64 + 64 * (this.cur / this.end);

    let curAngle = Math.PI * 1.5 - Math.PI * 2 * (1 - this.cur / this.end);
    let fullAngle = (Math.PI * 2 * this.cur) / this.end;
    let totalAmount = 0;
    for (const { amount } of this.data) {
      totalAmount += amount;
    }

    // 상위 콘텍스트(api 또는 component)의 환경에 따라 변경 가능하기 때문에 우선은 any로 지정
    this.data.forEach(({ amount, color }: { amount: any; color: any }) => {
      ctx.beginPath();
      let deltaAngle = (fullAngle * amount) / totalAmount;
      ctx.arc(x, y, radius, curAngle, curAngle + deltaAngle, false);
      curAngle += deltaAngle;
      ctx.lineWidth = 64 + 32 * (this.cur / this.end);
      ctx.strokeStyle = color;
      ctx.stroke();
    });

    this.cur += (this.end - this.cur) / 32;
    if (this.cur <= this.end) {
      if (this.cur >= this.end - 0.1) {
        this.cur = this.end;
      }
      window.requestAnimationFrame(this.render.bind(this));
    }
  }
}
