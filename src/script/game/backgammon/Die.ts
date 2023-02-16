import G from "../G";
import GameObject from "../GameObject";
import Updater from "../Updater";
import BackgammonGame from "./BackgammonGame";

class Die extends GameObject {
  static pos: number[] = [1, -1, 3, -3];
  static pss: [number, number][][] = [
    [[0.5, 0.5]],
    [
      [0.25, 0.5],
      [0.75, 0.5],
    ],
    [
      [0.25, 0.25],
      [0.5, 0.5],
      [0.75, 0.75],
    ],
    [
      [0.33, 0.33],
      [0.33, 0.66],
      [0.66, 0.33],
      [0.66, 0.66],
    ],
    [
      [0.25, 0.25],
      [0.25, 0.75],
      [0.5, 0.5],
      [0.75, 0.25],
      [0.75, 0.75],
    ],
    [
      [0.25, 0.33],
      [0.5, 0.33],
      [0.75, 0.33],
      [0.25, 0.66],
      [0.5, 0.66],
      [0.75, 0.66],
    ],
  ];

  public num: number;

  private idx: number;
  private id: number;

  constructor(root: BackgammonGame, idx: number, id: number, num: number) {
    super(root);

    this.idx = idx;
    this.id = id;
    this.num = num;
  }

  /**
   * For Record
   * @returns
   */
  public getJson() {
    return {
      idx: this.idx,
      id: this.id,
      num: this.num,
    };
  }

  protected onStart(): void {
    this.addUpdater(
      "render die",
      new Updater(() => {
        const L = this.root.L;
        const ox = 5;
        const oy = 6 + Die.pos[this.idx];
        G.Rect({
          y: (ox + 0.1) * L,
          x: (oy + 0.1) * L,
          ly: 0.8 * L,
          lx: 0.8 * L,
          color: this.id ? "#800" : "#ddd",
        });

        Die.pss[this.num - 1].forEach((p) => {
          G.Cir({
            y: (ox + p[0]) * L,
            x: (oy + p[1]) * L,
            radius: 0.07 * L,
            color: this.id ? "#ddd" : "#800",
          });
        });
      })
    );
  }
}

export default Die;
