import { returnPrice } from '@/utils/util';
import './style';
import LinearGraphConfig from './configType';
import linearGraphDefaultConfig from './defaultConfig';

const mockDate = '2021-08';
const mockData = [
  0, 0, 0, 0, -3000, -3600, -1000, -3000, -400, -5909, -2000, -3003,
];

export default class LinearGraph {
  date: string;
  data: number[];
  minData: number;

  $wrapper: HTMLElement;
  $dom: HTMLElement;
  $canvas: HTMLCanvasElement;

  config: LinearGraphConfig;
  cur: number;
  end: number;

  constructor({}) {
    //   constructor({ data, date }) {
    this.date = mockDate;
    this.data = mockData;
    this.minData = Math.min(...this.data);

    this.config = linearGraphDefaultConfig;
    const {
      canvasWidth,
      canvasHeight,
      animationStartPoint,
      animationEndPoint,
    } = this.config;

    this.$canvas = document.createElement('canvas');
    this.$canvas.className = 'linear';
    this.$canvas.width = canvasWidth;
    this.$canvas.height = canvasHeight;

    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'linear-wrapper';
    this.$wrapper.appendChild(this.$canvas);

    this.$dom = document.createElement('div');
    this.$dom.appendChild(this.$wrapper);

    this.cur = animationStartPoint;
    this.end = animationEndPoint;

    this.render();
  }

  renderBackground() {
    const ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    const { width, height } = this.$canvas;
    const {
      marginX,
      marginTop,
      marginBottom,
      backLineColor,
      fontColor,
      fontFamily,
      fontSize,
    } = this.config;

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

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    for (let i = 0; i < this.data.length; i++) {
      const calculatedDate = new Date(this.date);
      calculatedDate.setMonth(
        calculatedDate.getMonth() + i - this.data.length + 1
      );

      ctx.fillText(
        (calculatedDate.getMonth() + 1).toString(),
        marginX + (i * (width - marginX * 2)) / (this.data.length - 1),
        height - marginBottom + fontSize * 2
      );
    }
  }

  renderData() {
    const ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    const { width, height } = this.$canvas;
    const {
      marginX,
      marginTop,
      marginBottom,
      dataLineColor,
      dataArcColor,
      fontColor,
      fontFamily,
      fontSize,
      dataLineWidth,
      dataArcRadius,
    } = this.config;

    const positions = this.data.map((data, i) => {
      return {
        x: marginX + (i * (width - marginX * 2)) / (this.data.length - 1),
        y:
          height -
          marginBottom -
          (height - marginBottom - marginTop - fontSize * 2) *
            (this.cur / this.end) *
            (data / this.minData),
        value: data,
      };
    });

    for (let i = 1; i < positions.length; i++) {
      const oldLineWidth = ctx.lineWidth;
      ctx.lineWidth = dataLineWidth;
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
      ctx.arc(x, y, dataArcRadius, 0, 2 * Math.PI);
      ctx.fill();

      if (value) {
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = fontColor;
        ctx.textAlign = 'center';
        ctx.fillText(returnPrice(Math.abs(value)), x, y - fontSize);
      }
    });
  }

  render() {
    this.renderBackground();
    this.renderData();

    this.cur += (this.end - this.cur) / this.config.animationCoefficient;
    if (this.cur < this.end) {
      if (this.cur >= this.end - 0.1) {
        this.cur = this.end;
        window.requestAnimationFrame(this.render.bind(this));
      } else {
        window.requestAnimationFrame(this.render.bind(this));
      }
    }
  }
}
