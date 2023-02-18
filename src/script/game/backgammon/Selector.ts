import G from '../G';
import GameObject from '../GameObject';
import BackgammonGame from './BackgammonGame';
import Updater from '../Updater';
import C, { IPosition } from '../C';

class Selector extends GameObject {
  private p: IPosition = { x: -1, y: -1 };
  private tp: IPosition | null = null;
  private a: number = 0;
  private v: number = 0;

  constructor(root: BackgammonGame) {
    super(root);
  }

  protected onStart(): void {
    this.addUpdater(
      'render selector',
      new Updater(() => {
        const L = this.root.L;
        const { x, y } = this.p;
        if (x === -1) return;
        G.StrokePoly({
          ps: [
            [x * L, y * L],
            [x * L, (y + 1) * L],
            [(x + 5) * L, (y + 1) * L],
            [(x + 5) * L, y * L],
          ],
          width: 0.05 * L,
          color: '#008',
        });
      })
    );

    this.addUpdater(
      'move selector',
      new Updater(() => {
        if (!this.tp) return;
        const move_dist = this.v * this.dTime;
        const dist = C.distance(this.tp, this.p);
        const actual_move = Math.min(move_dist, dist);
        const dx = this.tp.x - this.p.x;
        const dy = this.tp.y - this.p.y;
        this.p.x += (actual_move * dx) / dist;
        this.p.y += (actual_move * dy) / dist;
        this.v -= this.a * this.dTime;
        if (dist < move_dist) this.tp = null;
      })
    );
  }

  public p2id(p: IPosition) {
    const { x, y } = p;
    if (x < 5) {
      this.setP({ x: 0, y });
      if (y < 6) return 12 - y;
      else if (6 < y && y < 13) return 13 - y;
      else if (y === 6) return 0;
      else return 27;
    } else if (x > 5) {
      this.setP({ x: 6, y });
      if (y < 6) return 13 + y;
      else if (6 < y && y < 13) return 12 + y;
      else if (y === 6) return 25;
      else return 26;
    } else {
      this.setP(null);
      return -1;
    }
  }

  public setP(p: IPosition | null) {
    if (p === null) {
      this.tp = null;
      this.p.x = -1;
      return;
    }
    if (this.p.x === -1) this.p = p;
    else {
      if (
        (this.tp === null && (this.p.x !== p.x || this.p.y !== p.y)) ||
        (this.tp !== null && (this.tp.x !== p.x || this.tp.y !== p.y))
      ) {
        this.tp = p;
        const { a, v } = C.spdShift(this.p, this.tp, 0.2);
        this.a = a;
        this.v = v;
      }
    }
  }
}

export default Selector;
