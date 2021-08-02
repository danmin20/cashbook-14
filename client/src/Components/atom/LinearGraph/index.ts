import { returnPrice } from '@/utils/util';
import './style';

const mock = [
  0, 0, 0, 0, -3000, -3600, -1000, -3000, -400, -5909, -2000, -3003,
];

export default class LinearGraph {
  date: string;
  data: number[]; // 상위 콘텍스트(api 또는 component)의 환경에 따라 변경 가능하기 때문에 우선은 any로 지정
  minData: number;
  $wrapper: HTMLElement;
  $dom: HTMLElement;
  $canvas: HTMLCanvasElement;
  cur: number;
  end: number;

  marginX: number;
  marginTop: number;
  marginBottom: number;
  backLineColor: string;
  dataArcColor: string;
  dataLineColor: string;
  fontColor: string;
  fontSize: number;
  fontFamily: string;

  constructor({}) {
    //   constructor({ data }) {
    this.date = '2021-07';
    this.data = mock;
    this.minData = Math.min(...this.data);

    this.$canvas = document.createElement('canvas');
    this.$canvas.className = 'linear';
    this.$canvas.width = 1024;
    this.$canvas.height = 512;

    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'linear-wrapper';
    this.$wrapper.appendChild(this.$canvas);

    this.$dom = document.createElement('div');
    this.$dom.appendChild(this.$wrapper);

    this.cur = 1;
    this.end = 100;
    this.marginX = 50;
    this.marginTop = 10;
    this.marginBottom = 40;
    this.backLineColor = '#ccd3d3';
    this.dataArcColor = '#2AC1BC';
    this.dataLineColor = '#A0E1E0';
    this.fontColor = '#626666';
    this.fontSize = 20;
    this.fontFamily = `${this.fontSize}px Noto Sans KR`;
    window.requestAnimationFrame(this.render.bind(this));
  }

  renderBackground() {
    const ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    const { width, height } = this.$canvas;
    const { marginX, marginTop, marginBottom, backLineColor } = this;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = backLineColor;
    const rows = this.data.length * 2 - 1;
    for (let i = 0; i < rows; i++) {
      ctx.beginPath();
      ctx.moveTo(marginX + (i * (width - marginX * 2)) / (rows - 1), marginTop);
      ctx.lineTo(
        marginX + (i * (width - marginX * 2)) / (rows - 1),
        height - marginBottom
      );
      ctx.stroke();
    }

    const cols = this.data.length;
    for (let i = 0; i < cols; i++) {
      ctx.beginPath();
      ctx.moveTo(
        marginX,
        marginTop + (i * (height - marginBottom - marginTop)) / (cols - 1)
      );
      ctx.lineTo(
        width - marginX,
        marginTop + (i * (height - marginBottom - marginTop)) / (cols - 1)
      );
      ctx.stroke();
    }

    ctx.font = this.fontFamily;
    ctx.fillStyle = this.fontColor;
    ctx.textAlign = 'center';
    for (let i = 0; i < this.data.length; i++) {
      ctx.fillText(
        (i + 1).toString(),
        marginX + (i * (width - marginX * 2)) / (this.data.length - 1),
        height - marginBottom + this.fontSize * 2
      );
    }
  }

  renderData() {
    const ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    const { width, height } = this.$canvas;
    const { marginX, marginTop, marginBottom, dataArcColor, dataLineColor } =
      this;

    const positions = this.data.map((data, i) => {
      return {
        x: marginX + (i * (width - marginX * 2)) / (this.data.length - 1),
        y:
          height -
          marginBottom -
          (height - marginBottom - marginTop - this.fontSize * 2) *
            (this.cur / this.end) *
            (data / this.minData),
        value: data,
      };
    });

    for (let i = 1; i < positions.length; i++) {
      const oldLineWidth = ctx.lineWidth;
      ctx.lineWidth = 4;
      ctx.strokeStyle = dataLineColor;
      ctx.beginPath();
      ctx.moveTo(positions[i - 1].x, positions[i - 1].y);
      ctx.lineTo(positions[i].x, positions[i].y);
      ctx.stroke();
      ctx.lineWidth = oldLineWidth;
    }

    positions.forEach(({ x, y, value }) => {
      ctx.beginPath();
      ctx.fillStyle = dataArcColor;
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();

      if (value) {
        ctx.font = this.fontFamily;
        ctx.fillStyle = this.fontColor;
        ctx.textAlign = 'center';
        ctx.fillText(returnPrice(Math.abs(value)), x, y - this.fontSize);
      }
    });
  }

  render() {
    this.renderBackground();
    this.renderData();

    this.cur += (this.end - this.cur) / 32;
    if (this.cur <= this.end) {
      window.requestAnimationFrame(this.render.bind(this));
    }
  }
}
