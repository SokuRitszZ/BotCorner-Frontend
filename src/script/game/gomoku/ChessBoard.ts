import G from "../G";
import GameObject from "../GameObject";
import Updater from "../Updater";
import GomokuGame from "./GomokuGame";

class ChessBoard extends GameObject {
  private chessboard: number[][];

  constructor(root: GomokuGame, chessboard: number[][]) {
    super(root);
    
    this.chessboard = chessboard;
  }

  protected onStart(): void {
    this.addUpdater(
      "render chess",
      new Updater(() => {
        const L = this.root.L;
        this.chessboard.forEach((_, i) => {
          _.forEach((_, j) => {
            if (_ !== 2) {
              G.Cir({
                x: (j + 1) * L,
                y: (i + 1) * L,
                radius: 0.4 * L,
                color: _ ? "#fff" : "#000"
              });
            }
          });
        });
      })
    );
  }

}

export default ChessBoard;