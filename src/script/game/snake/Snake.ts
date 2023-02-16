import GameObject from "../GameObject";
import SnakeGame from "./SnakeGame";
import Updater from "../Updater";
import C, { IPosition } from "../C";
import G from "../G";

export type IStatus = "alive" | "die";

class Snake extends GameObject {
  static dx: number[] = [-1, 0, 1, 0];
  static dy: number[] = [0, 1, 0, -1];

  public cells: IPosition[] = [];

  private status: IStatus = "alive";
  private mqTimer: NodeJS.Timer | undefined = undefined;
  private mqCallback: () => void = () => {};
  private mq: [number, boolean, IStatus, boolean][] = [];
  private color: string;
  private speed: number = 5;
  private stateStack: IPosition[][] = [];

  constructor(root: SnakeGame, position: IPosition, color: string) {
    super(root);

    this.cells.push(position);
    this.color = color;
  }

  public addNextStep(
    d: number,
    incr: boolean,
    status: "alive" | "die",
    dir: boolean
  ) {
    this.mq.push([d, incr, status, dir]);
  }

  protected onStart(): void {
    this.addUpdater(
      "render cells",
      new Updater(() => {
        if (this.status === "die") this.color === "#ffffff";
        const L = this.root.L;
        this.cells.forEach((cell) => {
          G.Cir({
            x: (cell.y + 0.5) * L,
            y: (cell.x + 0.5) * L,
            radius: L * 0.4,
            color: this.color,
          });
        });
        G.Cir({
          x: (this.cells[0].y + 0.5) * L,
          y: (this.cells[0].x + 0.5) * L,
          radius: L * 0.2,
          color: "#000000",
        });
      })
    );

    this.addUpdater(
      "render body",
      new Updater(() => {
        const L = this.root.L;

        this.cells.reduce((pre, cur) => {
          const dr = pre.x - cur.x;
          const dc = pre.y - cur.y;
          if (dr !== 0) {
            G.Rect({
              y: (Math.min(pre.x, cur.x) + 0.5) * L,
              x: (pre.y + 0.1) * L,
              ly: Math.abs(dr) * L,
              lx: 0.8 * L,
              color: this.color,
            });
          } else {
            G.Rect({
              y: (pre.x + 0.1) * L,
              x: (Math.min(pre.y, cur.y) + 0.5) * L,
              ly: 0.8 * L,
              lx: Math.abs(dc) * L,
              color: this.color,
            });
          }
          return cur;
        });
      })
    );

    this.mqTimer = setInterval(
      (this.mqCallback = () => {
        if (this.mq.length)
          this.nextStep(
            ...(this.mq.shift() as [number, boolean, IStatus, boolean])
          );
      }),
      250
    );

    document.addEventListener("visibilitychange", () => {
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

  private nextStep(d: number, incr: boolean, status: IStatus, dir: boolean) {
    if (!dir) {
      this.status = status;
      this.stateStack.push(
        this.cells.map((cell) => JSON.parse(JSON.stringify(cell)))
      );
      const nextCell: IPosition = {
        x: this.cells[0].x + Snake.dx[d],
        y: this.cells[0].y + Snake.dy[d],
      };
      this.cells = [{ ...this.cells[0] }].concat(
        this.cells.map((x) => ({ ...x } as IPosition))
      );
      this.addUpdater(
        "next step",
        new Updater(() => {
          const dr = nextCell.x - this.cells[0].x;
          const dc = nextCell.y - this.cells[0].y;
          const dist = C.distance(nextCell, this.cells[0]);
          const move_dist = this.speed * this.dTime;
          if (dist < move_dist) {
            this.cells[0] = nextCell;
            if (!incr) this.cells.pop();
            this.delUpdater("next step");
          } else {
            this.cells[0].x += (move_dist * dr) / dist;
            this.cells[0].y += (move_dist * dc) / dist;
            if (!incr) {
              const n = this.cells.length;
              const tail = this.cells[n - 1];
              const target = this.cells[n - 2];
              const dr = target.x - tail.x;
              const dc = target.y - tail.y;
              tail.x += (move_dist * dr) / dist;
              tail.y += (move_dist * dc) / dist;
            }
          }
        })
      );
    } else {
      this.delUpdater("next step");
      this.cells = this.stateStack.pop()!;
    }
  }
}

export default Snake;
