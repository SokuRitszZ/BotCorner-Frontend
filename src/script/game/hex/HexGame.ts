import { IRecord } from "@/utils/RecordPlayer";
import C, { IPosition, Vector } from "../C";
import Game from "../Game";
import Chess from "./Chess";
import GameMap from "./GameMap";

class HexGame extends Game {
  private static dx = [-1, -1, -1, 0, 1, 1, 1, 0];
  private static dy = [-1, 0, 1, 1, 1, 0, -1, -1];

  public rows: number = 11;
  public cols: number = 11;
  public g: number[][] = [];
  public lastPut: { r: number; c: number } = { r: -1, c: -1 };

  private map: GameMap = new GameMap(this);
  private clickEvent: (e: MouseEvent) => void = (e) => {};
  private moveEvent: (e: MouseEvent) => void = (e) => {};
  private cur: number = 0; // 0红1蓝
  private chess: Chess[] = [];
  private currentChess: Chess = new Chess(this, -1, -1, this.cur, 0.7);

  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super($parent, $canvas);
  }

  public static getPosition(x: number, y: number) {
    const vx = new Vector(1.732, 0);
    const vy = new Vector(1.732, 0);
    vx.rot(Math.PI / 6);
    vy.rot(-Math.PI / 6);
    vx.mul(x);
    vy.mul(y);
    return vx.add(vy).add(new Vector(1, 10));
  }

  public static findPosition(x: number, y: number) {
    let ret: IPosition | undefined;
    new Array(11).fill(0).forEach((_, i) => {
      new Array(11).fill(0).forEach((_, j) => {
        const p = this.getPosition(i, j);
        const d = C.distance(p, {x, y});
        if (d < 0.8) ret = {x: i, y: j};
      });
    });
    return ret;
  }

  protected onStart(): void {
    this.clickEvent = (e: MouseEvent) => {
      const p = HexGame.findPosition(e.offsetY / this.L, e.offsetX / this.L);
      if (!p) return ;
      if (this.mode === "single") {
        this.emit("click", {
          id: this.cur,
          ...p,
        });
      }
      else if (this.mode === "multi")
        this.emit("click", { ...p });
    };
    this.moveEvent = (e: MouseEvent) => {
      const L = this.L;
      if (!L) return ;
      const p = HexGame.findPosition(e.offsetY / L, e.offsetX / L);
      if (!p) this.setCurrentChess();
      else this.setCurrentChess(p)
    };
    this.$canvas.addEventListener("click", this.clickEvent);
    this.$canvas.addEventListener("mousemove", this.moveEvent);
  }

  protected onStop(): void {
    this.$canvas.removeEventListener("click", this.clickEvent);
    this.$canvas.removeEventListener("mousemove", this.moveEvent);
  }

  public next(cur: { v: number }, record: IRecord) {
    const step = record.steps.slice(cur.v, cur.v + 2);
    cur.v += 2;
    return step;
  }

  public parseAndAct(data: string): void {
    "r.c";
    const [r, c] = data.split("").map(x => parseInt(x, 36));
    this.setStep({ id: 0, r, c, step: data });
  }

  protected _setStep(data: { id: number; r: number; c: number, step: string }) {
    const { id, r, c, step } = data;
    this.putChess(r, c, step);
    return this;
  }

  protected _prepare(options: {
    mode: "single" | "multi" | "record";
    initData: any;
  }): this {
    const { mode, initData } = options;
    this.mode = mode;
    this.setScreen([20, 32]);
    let k = 0;
    return this;
  }

  private setCurrentChess(p?: IPosition) {
    this.currentChess.setPos(p).setId(this.cur);
  }

  private putChess(x: number, y: number, step: string) {
    this.chess.push(new Chess(this, x, y, this.cur));
    this.cur ^= 1;

    this.memo(step, () => {
      this.chess.pop()?.destroy();
      this.cur ^= 1;
    });
  }
}

export default HexGame;