import { IRecord } from "@/utils/RecordPlayer";
import Game from "../Game";
import Chess from "./Chess";
import GameMap from "./GameMap";
import Selector from "./Selector";
import Die from "./Die";

class BackgammonGame extends Game {
  public readonly rows = 11;
  public readonly cols = 14;
  public g: Chess[][] = new Array<Chess[]>(28).fill([]).map((x) => []);

  private map: GameMap = new GameMap(this);
  private clickEvent: (e: MouseEvent) => void = () => {};
  private moveEvent: (e: MouseEvent) => void = () => {};
  private selectors: Selector[] = [new Selector(this), new Selector(this)];
  private selectedId: number = -1;
  private dice: Die[] = [];
  private cur: number = 0;

  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super($parent, $canvas);
  }

  public next(cur: { v: number }, record: IRecord) {
    "v.from.to";
    "d.12{34}";
    "t";
    "p";
    let step = "";
    switch (record.steps[cur.v]) {
      case "t":
      case "p":
        step = record.steps.slice(cur.v, cur.v + 1);
        cur.v += 1;
        break;
      case "v":
        step = record.steps.slice(cur.v, cur.v + 3);
        cur.v += 3;
        break;
      case "z":
        if (!isNaN(parseInt(record.steps[cur.v + 3]))) {
          step = record.steps.slice(cur.v, cur.v + 5);
          cur.v += 5;
        } else {
          step = record.steps.slice(cur.v, cur.v + 3);
          cur.v += 3;
        }
        break;
    }
    return step;
  }

  public parseAndAct(data: string): void {
    "v.from.to";
    "d.12{34}";
    "t";
    "p";
    switch (data[0]) {
      case "v":
        this.setStep({
          type: "move",
          from: parseInt(data[1], 36),
          to: parseInt(data[2], 36),
          step: data,
        });
        break;
      case "z":
        this.setStep({
          type: "dice",
          dice: data.slice(1),
          step: data,
        });
        break;
      case "t":
        this.setStep({
          type: "turn",
          step: data,
        });
        break;
      case "p":
        this.setStep({
          type: "pass",
          step: data,
        });
        break;
    }
  }

  protected onStart(): void {
    this.moveEvent = (e: MouseEvent) => {
      const L = this.L;
      const { offsetX: x, offsetY: y } = e;
      this.selectors[0].p2id({
        y: Math.floor(x / L),
        x: Math.floor(y / L),
      });
    };
    this.$canvas.addEventListener("mousemove", this.moveEvent);

    this.clickEvent = (e: MouseEvent) => {
      const L = this.L;
      const { offsetX: x, offsetY: y } = e;
      if (e.button === 0) {
        this.selectedId = this.selectors[1].p2id({
          y: Math.floor(x / L),
          x: Math.floor(y / L),
        });
      } else if (e.button === 2) {
        if (this.selectedId !== -1) {
          const id = this.selectors[1].p2id({
            y: Math.floor(x / L),
            x: Math.floor(y / L),
          });
          this.emit("choose", {
            id: this.cur,
            from: this.selectedId,
            to: id,
          });
          this.selectors[1].p2id({
            y: 5,
            x: 5,
          });
          this.selectedId = -1;
        }
      }
    };
    this.$canvas.addEventListener("mousedown", this.clickEvent);
    this.$canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  protected onStop(): void {
    this.$canvas.removeEventListener("mousemove", this.moveEvent);
  }

  protected _setStep(data: any) {
    const { type, step } = data;
    switch (type) {
      case "dice":
        this.setDice(data.dice.split("").map((x: string) => parseInt(x)), step);
        break;
      case "move":
        this.moveChess(data.from, data.to, step);
        break;
      case "pass":
        this.pass(step);
        break;
      case "turn":
        this.turn(step);
        break;
    }
    return this;
  }

  protected _prepare(options: {
    mode: "single" | "multi" | "record";
    initData: any;
  }): this {
    const { mode, initData } = options;
    this.mode = mode;

    const { mask, start, dice } = initData;
    this.cur = start;
    this.dice = dice.split("").map((x: string, i: number) => {
      return new Die(this, i, this.cur, parseInt(x));
    });

    for (let i = 0; i < 26; ++i) {
      const [tpe, cnt] = [
        parseInt(mask[i << 1]),
        parseInt(mask[(i << 1) | 1], 36),
      ];
      for (let j = 0; j < cnt; ++j) {
        this.addChessTo(i, tpe);
      }
    }
    this.setScreen([this.cols, this.rows]);

    return this;
  }

  private setDice(dice: number[], step: string) {
    const oldDice = this.dice.map(die => die.getJson())
    this.dice.forEach((die) => die.destroy());
    this.dice = dice.map((x, i) => new Die(this, i, this.cur, x));
    this.memo(step, () => {
      this.dice.forEach(die => die.destroy());
      this.dice = oldDice.map((die: any) => new Die(this, die.idx, die.id, die.num));
    });
  }

  private pass(step: string) {
    this.cur ^= 1;
    this.emit("pass", this.cur);
    this.memo(step, () => {
      this.cur ^= 1;
    });
  }

  private turn(step: string) {
    this.cur ^= 1;
    this.emit("turn", this.cur);
    this.memo(step, () => {
      this.cur ^= 1;
    });
  }

  private addChessTo(i: number, id: number) {
    const { x, y } = Chess.calcPos(i, this.g[i].length + 1);
    this.g[i].push(new Chess(this, id, x, y));
  }

  private moveChess(from: number, to: number, step: string, isEaten?: boolean) {
    if (!this.g[from].length) return;
    const chess = this.g[from].pop()!;
    const moved: [number, number][] = [];
    if (this.g[to].length === 1 && this.g[to][0].id !== chess.id) {
      moved.push([to, this.g[to][0].id * 25]);
      this.moveChess(to, this.g[to][0].id * 25, step, true);
    }
    this.g[to].push(chess);
    moved.push([from, to]);
    chess.moveTo(to, this.g[to].length);

    if (!isEaten) {
      // 骰子
      if (to === 26 || to === 27) to = 25 * (1 - chess.id);
      const len = Math.abs(to - from)
      let idx = this.dice.findIndex((die) => die.num === len);
      if (idx === -1) idx = 0;
      this.dice[idx].destroy();

      const die = this.dice[idx].getJson();
      this.dice.splice(idx, 1);
      this.memo(step, () => {
        while (moved.length) {
          const [from, to] = moved.pop()!;
          const chess = this.g[to].pop()!;
          this.g[from].push(chess);
          chess.moveTo(from, this.g[from].length);
        }
        this.dice.splice(idx, 0, new Die(this, die.idx, die.id, die.num));
      });
    }
  }
}

export default BackgammonGame;
