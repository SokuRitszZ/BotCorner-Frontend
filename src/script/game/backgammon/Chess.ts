import C, { IPosition } from "../C";
import G from "../G";
import GameObject from "../GameObject";
import Updater from "../Updater";
import BackgammonGame from "./BackgammonGame";

class Chess extends GameObject {
  public isInHome = false;
  public id: number;

  private p: IPosition;
  private tp: IPosition | null = null;
  private a: number = 0;
  private v: number = 0;

  static calcPos(i: number, count: number) {
    let result = { x: 0, y: 0 };
    if (1 <= i && i <= 12) {
      const y = 13.5 - i - (i > 6 ? 1 : 0);
      let x = 0.5;
      for (let j = 0, k = 0; j < count; ++j) {
        if (j === 0 || j === 5 || j === 9 || j === 12 || j === 14)
          x = ++k * 0.5;
        x += 1;
      }
      x -= 1;
      result = { x, y };
    } else if (13 <= i && i <= 24) {
      const y = i - 12.5 + (i > 18 ? 1 : 0);
      let x = 0.5;
      for (let j = 0, k = 0; j < count; ++j) {
        if (j === 0 || j === 5 || j === 9 || j === 12 || j === 14 || j === 15)
          x = ++k * 0.5;
        x += 1;
      }
      x -= 1;
      x = 11 - x;
      result = { x, y };
    } else if (i === 0) {
      // 白棋回老家
      const y = 6.5;
      let x = 0.5;
      for (let j = 0, k = 0; j < count; ++j) {
        if (j === 0 || j === 5 || j === 9 || j === 12 || j === 14 || j === 15)
          x = ++k * 0.5;
        x += 1;
      }
      x -= 1;
      result = { x, y };
    } else if (i === 27) {
      // 红棋归位
      let x = 0;
      const y = 13;
      for (let i = 1; i < count; ++i) x += 0.33;
      result = { x, y };
    } else if (i === 25) {
      // 红棋回老家
      const y = 6.5;
      let x = 0.5;
      for (let j = 0, k = 0; j < count; ++j) {
        if (j === 0 || j === 5 || j === 9 || j === 12 || j === 14 || j === 15)
          x = ++k * 0.5;
        x += 1;
      }
      x -= 1;
      x = 11 - x;
      result = { x, y };
    } else if (i === 26) {
      // 白棋归位
      let x = 11 - 0.33;
      const y = 13;
      for (let i = 1; i < count; ++i) x -= 0.33;
      result = { x, y };
    }
    return result;
  }

  constructor(root: BackgammonGame, id: number, x: number, y: number) {
    super(root);

    this.id = id;
    this.p = { x, y };
  }

  public moveTo(to: number, count: number) {
    this.root.removeObj(this);
    const tp = Chess.calcPos(to, count);

    const shift = C.spdShift(this.p, tp, 0.5);
    this.a = shift.a;
    this.v = shift.v;
    this.tp = tp;
    if (to === 26 + this.id) this.isInHome = true;
    else this.isInHome = false;
    this.root.addObj(this);
  }

  protected onStart(): void {
    this.addUpdater(
      "render chess",
      new Updater(() => {
        const L = this.root.L;
        const { x, y } = this.p;
        if (!this.isInHome) {
          G.Cir({
            y: x * L,
            x: y * L,
            radius: L / 2,
            color: "#222",
          });
          G.Cir({
            y: x * L,
            x: y * L,
            radius: (L / 2) * 0.95,
            color: this.id ? "#900" : "#ccc",
          });
        } else {
          G.Rect({
            y: x * L,
            x: y * L,
            ly: 0.33 * L,
            lx: L,
            color: this.id ? "#900" : "#ccc",
          });
          G.StrokePoly({
            ps: [
              [x * L, y * L],
              [x * L, (y + 1) * L],
              [(x + 0.33) * L, (y + 1) * L],
              [(x + 0.33) * L, y * L],
            ],
            color: "000",
            width: 0.05 * L,
          });
        }
      })
    );

    this.addUpdater(
      "move chess",
      new Updater(() => {
        if (!this.tp) return;
        const move_dist = this.v * this.dTime;
        const dist = C.distance(this.p, this.tp);
        if (dist === 0) return;
        const actual_move = Math.min(move_dist, dist);
        const dx = this.tp.x - this.p.x;
        const dy = this.tp.y - this.p.y;
        this.p.x += (actual_move * dx) / dist;
        this.p.y += (actual_move * dy) / dist;
        this.v -= this.a * this.dTime;
        this.v = Math.max(this.v, 0);
        if (this.v === 0) this.tp = null;
      })
    );
  }
}

export default Chess;
