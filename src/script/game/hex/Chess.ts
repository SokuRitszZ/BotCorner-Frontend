import { IPosition } from "../C";
import G from "../G";
import GameObject from "../GameObject";
import Updater from "../Updater";
import HexGame from "./HexGame";

class Chess extends GameObject {
  private p: IPosition;
  private id: number;
  private radius: number;

  constructor(
    root: HexGame,
    x: number,
    y: number,
    id: number,
    radius?: number
  ) {
    super(root);

    this.p = { x, y };
    this.id = id;
    this.radius = radius || 0.8;
  }

  public eq(p?: IPosition) {
    if (!p) return false;
    return this.p.x === p.x && this.p.y === p.y;
  }

  public setPos(p?: { x: number; y: number }) {
    this.p = p || { x: -1, y: -1 };
    return this;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  protected onStart(): void {
    this.addUpdater(
      "render chess",
      new Updater(() => {
        const L = this.root.L;
        const { x, y } = this.p;
        if (x === -1) return;
        const { x: nx, y: ny } = HexGame.getPosition(x, y);
        G.Hex({
          x: nx * L,
          y: ny * L,
          radius: this.radius * L,
          color: this.id ? "#00f" : "#f00",
        });
      })
    );
  }
}

export default Chess;
