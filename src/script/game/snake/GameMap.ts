import G from "../G";
import GameObject from "../GameObject";
import Updater from "../Updater";
import SnakeGame from "./SnakeGame";

class GameMap extends GameObject {
  constructor(root: SnakeGame) {
    super(root);
  }

  protected onStart() {
    this.addUpdater(
      "render map",
      new Updater(() => {
        const L = this.root.L;

        (this.root as SnakeGame).g.forEach((_, i) => {
          _.forEach((_, j) => {
            G.Rect({
              y: i * L,
              x: j * L,
              lx: L,
              ly: L,
              color: _ ? "#896c50" : ((i + j) & 1 && "#dddddd") || "#efefef",
            });
          });
        });
      })
    );
  }
}

export default GameMap;
