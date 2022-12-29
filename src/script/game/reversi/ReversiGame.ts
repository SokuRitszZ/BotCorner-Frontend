import { IRecord } from "@/utils/RecordPlayer";
import Game from "../Game";
import GameMap from "./GameMap";

class ReversiGame extends Game {
  private static dx = [-1, -1, -1, 0, 1, 1, 1, 0];
  private static dy = [-1, 0, 1, 1, 1, 0, -1, -1];

  public rows: number = 0;
  public cols: number = 0;
  public g: number[][] = [];
  public lastPut: {r: number, c: number} = {r: -1, c: -1};

  private map: GameMap = new GameMap(this);
  private clickEvent: (e: MouseEvent) => void = (e) => {}
  private cur: number = 0;
  
  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super($parent, $canvas);
  }

  protected onStart(): void {
    this.clickEvent = (e: MouseEvent) => {
      const pos = {r: Math.floor(e.offsetY / this.L), c: Math.floor(e.offsetX / this.L)};
      if (this.mode === "single") {
        this.emit("click", {
          id: this.cur,
          ...pos,
        });
      } else if (this.mode === "multi") {
        this.emit("click", {...pos});
      }
    };
    this.$canvas.addEventListener("click", this.clickEvent);
  }

  protected onStop(): void {
    this.$canvas.removeEventListener("click", this.clickEvent);
  }

  public next(cur: {v: number}, record: IRecord) {
    const step = record.steps.slice(cur.v, cur.v + 3);
    cur.v += 3;
    return step;
  }

  public parseAndAct(data: string): void {
    "id.r.c";
    const [id, r, c] = data.split("").map(x => parseInt(x));
    this.setStep({ id, r, c });
  }

  protected _setStep(data: {
    id: number,
    r: number,
    c: number,
  }) {
    const { id, r, c } = data;
    this.putChess(id, r, c);
    return this;
  }

   protected _prepare(options: { mode: "single" | "multi" | "record"; initData: any; }): this {
    const { mode, initData } = options;
    this.mode = mode;

    let { rc, mask } = initData;
    this.cols = rc & (1 << 16) - 1;
    rc >>= 16;
    this.rows = rc & (1 << 16) - 1;
    this.setScreen([this.cols, this.rows]);

    let k = 0;
    this.g = new Array(this.rows).fill(0).map(x => new Array<number>(this.cols).fill(0)).map(x => {
      return x.map(x => {
        return parseInt(mask[k++]);
      });
    });
    
    return this;
  }

  private putChess(id: number, r: number, c: number) {
    if (r === 9) {
      this.pass();
      return ;
    }
    this.g[r][c] = id;
    this.lastPut = {r, c};
    for (let i = 0; i < 8; ++i) {
      if (this.isValidDir(r, c, i, id)) {
        let nr = r + ReversiGame.dx[i];
        let nc = c + ReversiGame.dy[i];
        while (this.isIn(nr, nc) && this.g[nr][nc] === (id ^ 1)) {
          this.g[nr][nc] = id;
          nr += ReversiGame.dx[i];
          nc += ReversiGame.dy[i];
        }
      }
    }
    this.cur ^= 1;
    this.emit("put chess", { 
      id, 
      r, 
      c, 
      cnt: [this.getCnt(0), this.getCnt(1)]
    });
  }

  private getCnt(x: number) {
    let res = 0;
    for (let i = 0; i < this.rows; ++i) {
      for (let j = 0; j < this.cols; ++j) 
        res += this.g[i][j] === x ? 1 : 0;
    }
    return res;
  }
  
  private pass() {
    this.cur ^= 1;
    this.emit("pass", this.cur ^ 1);
  }

  private isValidDir(r: number, c: number, dir: number, id: number) {
    let nr = r + ReversiGame.dx[dir];
    let nc = c + ReversiGame.dy[dir];
    let cnt = 0;
    while (this.isIn(nr, nc) && this.g[nr][nc] === (id ^ 1)) {
      nr += ReversiGame.dx[dir];
      nc += ReversiGame.dy[dir];
      cnt = 1;
    }
    return cnt === 1 && this.isIn(nr, nc) && this.g[nr][nc] === id;
  }

  private isIn(r: number, c: number) {
    return 0 <= r && r < this.rows && 0 <= c && c < this.cols;
  }
}

export default ReversiGame;

export type IPosition = {
  r: number;
  c: number;
};