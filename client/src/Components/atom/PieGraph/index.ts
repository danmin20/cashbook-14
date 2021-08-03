import PieGraphConfig from './configType';
import pieGraphDefaultConfig from './defaultConfig';
import './style';

interface PieGraphData {
  category: string;
  amount: number;
  color: string;
}

export default class PieGraph {
  data: PieGraphData[];
  $wrapper: HTMLElement;
  $dom: HTMLElement;
  $canvas: HTMLCanvasElement;
  cur: number;
  end: number;
  config: PieGraphConfig;

  constructor({ data }: { data: PieGraphData[] }) {
    this.data = data;
    this.config = pieGraphDefaultConfig;
    const {
      canvasWidth,
      canvasHeight,
      animationStartPoint,
      animationEndPoint,
    } = this.config;

    this.$canvas = document.createElement('canvas');
    this.$canvas.className = 'pie';
    this.$canvas.width = canvasWidth;
    this.$canvas.height = canvasHeight;

    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'pie-wrapper';
    this.$wrapper.appendChild(this.$canvas);

    this.$dom = document.createElement('div');
    this.$dom.appendChild(this.$wrapper);

    this.cur = animationStartPoint;
    this.end = animationEndPoint;

    this.render();
  }

  render() {
    const { pieRadius, pieLineWidth, animationCoefficient } = this.config;

    const ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    const x = this.$canvas.width / 2;
    const y = this.$canvas.height / 2;
    const radius = pieRadius / 2 + (pieRadius / 2) * (this.cur / this.end);

    let curAngle = Math.PI * 1.5 - Math.PI * 2 * (1 - this.cur / this.end);
    let fullAngle = (Math.PI * 2 * this.cur) / this.end;
    let totalAmount = 0;
    for (const { amount } of this.data) {
      totalAmount += amount;
    }

    this.data.forEach(({ amount, color }) => {
      ctx.beginPath();
      let deltaAngle = (fullAngle * amount) / totalAmount;
      ctx.arc(x, y, radius, curAngle, curAngle + deltaAngle, false);
      curAngle += deltaAngle;
      ctx.lineWidth =
        pieLineWidth / 2 + (pieLineWidth / 2) * (this.cur / this.end);
      ctx.strokeStyle = color;
      ctx.stroke();
    });

    this.cur += (this.end - this.cur) / animationCoefficient;
    if (this.cur <= this.end) {
      if (this.cur >= this.end - 0.1) {
        this.cur = this.end;
      }
      window.requestAnimationFrame(this.render.bind(this));
    }
  }
}
