import { IRecord } from '@/utils/RecordPlayer';
import Game from '../Game';
import GameMap from './GameMap';
import Snake, { IStatus } from './Snake';

class SnakeGame extends Game {
  public rows: number = 0;
  public cols: number = 0;
  public g: number[][] = [];

  private map: GameMap = new GameMap(this);
  private snakes: Snake[] = [];

  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super($parent, $canvas);
  }

  onStart(): void {}

  onStop(): void {}

  public next(cur: { v: number }, record: IRecord) {
    const step = record.steps.slice(cur.v, cur.v + 5);
    cur.v += 5;
    return step;
  }

  public parseAndAct(data: string): void {
    'd0.d1.incr.status0.status1';
    const d = [parseInt(data[0]), parseInt(data[1])];
    const incr = data[2] == '1';
    const status = [data[3], data[4]].map((x) => (x == '1' ? 'die' : 'alive'));
    [0, 1].forEach((x) =>
      this.setStep({
        id: x,
        d: d[x],
        incr: incr,
        status: status[x],
        step: data,
      })
    );
    this.memo(data, () => {
      [0, 1].forEach((x) => {
        this.snakes[x].addNextStep(d[x], incr, status[x], true);
      });
    });
  }

  _setStep(data: {
    id: number;
    d: number;
    incr: boolean;
    status: IStatus;
    step: string;
  }) {
    const { id, d, incr, status } = data;
    this.snakes[id].addNextStep(d, incr, status, false);

    return this;
  }

  _prepare(options: {
    mode: 'single' | 'multi' | 'record';
    initData: any;
  }): this {
    const { initData } = options;

    let { rc } = initData;
    const { mask } = initData;
    this.cols = rc & ((1 << 16) - 1);
    rc >>= 16;
    this.rows = rc & ((1 << 16) - 1);
    this.setScreen([this.cols, this.rows]);

    let k = 0;
    this.g = new Array(this.rows)
      .fill(0)
      .map(() => new Array<number>(this.cols).fill(0))
      .map((x) => {
        return x.map(() => {
          return parseInt(mask[k++]);
        });
      });

    this.snakes = [
      new Snake(
        this,
        {
          x: 1,
          y: this.cols - 2,
        },
        '#ff0000'
      ),
      new Snake(
        this,
        {
          x: this.rows - 2,
          y: 1,
        },
        '#0000ff'
      ),
    ];

    return this;
  }
}

export default SnakeGame;
