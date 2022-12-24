import GameObject from "../GameObject";
import SnakeGame from "./SnakeGame";
import { IPosition } from "./SnakeGame";
import Updater from "../Updater";
import C from "../C";
import G from "../G";

export type IStatus = "alive" | "die";

class Snake extends GameObject {
  static dx: number[] = [-1, 0, 1, 0];
  static dy: number[] = [0, 1, 0, -1];

  public cells: IPosition[] = [];

  private status: IStatus = "alive";
  private mqTimer: NodeJS.Timer | undefined = undefined;
  private mqCallback: () => void = () => {};
  private mq: [number, boolean, IStatus][] = [];
  private color: string;
  private speed: number = 5;

  constructor(root: SnakeGame, position: IPosition, color: string) {
    super(root);
    
    this.cells.push(position);
    this.color = color;
  }

  public addNextStep(d: number, incr: boolean, status: "alive" | "die") {
    this.mq.push([d, incr, status]);
  }

  protected onStart(): void {
    this.addUpdater("render cells", new Updater(() => {
      if (this.status === 'die') this.color === '#ffffff';
      const L = this.root.L;
      this.cells.forEach(cell => {
        G.Cir({
          x: (cell.c + 0.5) * L,
          y: (cell.r + 0.5) * L,
          radius: L * 0.4,
          color: this.color,
        });
      });
      G.Cir({
        x: (this.cells[0].c + 0.5) * L,
        y: (this.cells[0].r + 0.5) * L,
        radius: L * 0.1,
        color: "#000000",
      });
    }));
    
    this.addUpdater("render body", new Updater(() => {
      const L = this.root.L;
      
      this.cells.reduce((pre, cur) => {
        let dr = pre.r - cur.r;
        let dc = pre.c - cur.c;
        if (dr !== 0) {
          G.Rect({
            y: (Math.min(pre.r, cur.r) + 0.5) * L,
            x: (pre.c + 0.1) * L,
            ly: Math.abs(dr) * L,
            lx: 0.8 * L,
            color: this.color,
          });
        } else {
          G.Rect({
            y: (pre.r + 0.1) * L,
            x: (Math.min(pre.c, cur.c) + 0.5) * L,
            ly: 0.8 * L,
            lx: Math.abs(dc) * L,
            color: this.color,
          });
        }
        return cur;
      });
    }));

    this.mqTimer = setInterval(this.mqCallback = () => {
      if (this.mq.length) 
        this.nextStep(...(this.mq.shift() as [number, boolean, IStatus]));
    }, 250);

    document.addEventListener('visibilitychange', e => {
      if (document.visibilityState === "hidden") {
        clearInterval(this.mqTimer);
      } else {
        this.mqTimer = setInterval(this.mqCallback, 250);
      }
    });
  }

  protected onDestroy(): void {
    clearInterval(this.mqTimer);
  }

  private nextStep(d: number, incr: boolean, status: IStatus) {
    if (this.status === "die") return ;
    this.status = status;
    if (status === "die") this.color = "#ffffff";
    const nextCell: IPosition = {
      r: this.cells[0].r + Snake.dx[d],
      c: this.cells[0].c + Snake.dy[d],
    };
    this.cells = [{ ...this.cells[0] }].concat(
      this.cells.map((x) => ({ ...x } as IPosition))
    );
    this.addUpdater("next step", new Updater(() => {
      let dr = nextCell.r - this.cells[0].r;
      let dc = nextCell.c - this.cells[0].c;
      let dist = C.distance(nextCell, this.cells[0]);
      const move_dist = this.speed * this.dTime;
      if (dist < move_dist) {
        this.cells[0] = nextCell;
        if (!incr) this.cells.pop();
        this.delUpdater("next step");
      } else {
        this.cells[0].r += move_dist * dr / dist;
        this.cells[0].c += move_dist * dc / dist;
        if (!incr) {
          const n = this.cells.length;
          const tail = this.cells[n - 1];
          const target = this.cells[n - 2];
          const dr = target.r - tail.r;
          const dc = target.c - tail.c;
          tail.r += move_dist * dr / dist;
          tail.c += move_dist * dc / dist;
        }
      }
    }));
  }
};

export default Snake;