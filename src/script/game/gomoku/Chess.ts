import { IPosition, Vector } from "../C";
import G from "../G";
import GameObject from "../GameObject";
import Updater from "../Updater";
import GomokuGame from "./GomokuGame";

class Chess extends GameObject {
  private p: IPosition;
  private id: number;
  private radius: number;

  constructor(root: GomokuGame, x: number, y: number, id: number, radius?: number) {
    super(root);
    
    this.p = {x, y};
    this.id = id;
    this.radius = radius || 0.8;
  }

  public eq(p?: IPosition) {
    if (!p) return false;
    return this.p.x === p.x && this.p.y === p.y;
  }

  public setPos(p?: {x: number, y: number}) {
    this.p = p || {x: -1, y: -1};
    return this;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  protected onStart(): void {
    this.addUpdater("render chess", new Updater(() => {
      const L = this.root.L;
      const {x, y} = this.p;
      if (x === -1) return ;
    }));
  }
}

export default Chess;