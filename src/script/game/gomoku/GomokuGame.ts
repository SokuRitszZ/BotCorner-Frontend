import { IRecord } from '@/utils/RecordPlayer';
import Game from '../Game';
import ChessBoard from './ChessBoard';
import GameMap from './GameMap';

class GomokuGame extends Game {
  private static dx = [-1, -1, -1, 0, 1, 1, 1, 0];
  private static dy = [-1, 0, 1, 1, 1, 0, -1, -1];

  public rows: number = 15;
  public cols: number = 15;
  public g: number[][] = [];
  public lastPut: { r: number; c: number } = { r: -1, c: -1 };

  private map: GameMap = new GameMap(this);
  private clickEvent: (e: MouseEvent) => void = () => {};
  private moveEvent: (e: MouseEvent) => void = () => {};
  private chessboard: ChessBoard = new ChessBoard(this, this.g);
  private cur: number = 0; // 0黑1白

  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super($parent, $canvas);
  }

  public onStart(): void {
    this.clickEvent = (e: MouseEvent) => {
      const p = {
        r: Math.floor(e.offsetY / this.L - 0.5),
        c: Math.floor(e.offsetX / this.L - 0.5),
      };
      if (this.mode === 'single') {
        this.emit('click', {
          id: this.cur,
          ...p,
        });
      } else if (this.mode === 'multi') this.emit('click', { ...p });
    };
    this.moveEvent = () => {
      const L = this.L;
      if (!L) return;
    };
    this.$canvas.addEventListener('click', this.clickEvent);
    this.$canvas.addEventListener('mousemove', this.moveEvent);
  }

  public onStop(): void {
    this.$canvas.removeEventListener('click', this.clickEvent);
    this.$canvas.removeEventListener('mousemove', this.moveEvent);
  }

  public next(cur: { v: number }, record: IRecord) {
    const step = record.steps.slice(cur.v, cur.v + 2);
    cur.v += 2;
    return step;
  }

  public parseAndAct(data: string): void {
    'r.c';
    const [r, c] = data.split('').map((x) => parseInt(x, 36));
    this.setStep({ id: this.cur, r, c, step: data });
  }

  _setStep(data: { id: number; r: number; c: number; step: string }) {
    const { r, c, step } = data;
    this.putChess(r, c, step);
    return this;
  }

  _prepare(options: {
    mode: 'single' | 'multi' | 'record';
    initData: any;
  }): this {
    const { mode } = options;
    this.mode = mode;
    this.setScreen([16, 16]);
    for (let i = 0; i < 15; ++i) {
      this.g[i] = [];
      for (let j = 0; j < 15; ++j) {
        this.g[i][j] = 2;
      }
    }
    return this;
  }

  private putChess(r: number, c: number, step: string) {
    this.g[r][c] = this.cur;
    this.cur ^= 1;
    const lastLastPut = this.chessboard.lastPut;
    this.chessboard.lastPut = { x: r, y: c };

    this.memo(step, () => {
      this.g[r][c] = 2;
      this.cur ^= 1;
      this.chessboard.lastPut = lastLastPut;
    });
  }
}

export default GomokuGame;
