import { IPosition } from '../C';
import G from '../G';
import GameObject from '../GameObject';
import Updater from '../Updater';
import GomokuGame from './GomokuGame';

class ChessBoard extends GameObject {
  public lastPut?: IPosition;

  private chessboard: number[][];

  constructor(root: GomokuGame, chessboard: number[][]) {
    super(root);

    this.chessboard = chessboard;
  }

  protected onStart(): void {
    this.addUpdater(
      'render chess',
      new Updater(() => {
        const L = this.root.L;
        this.chessboard.forEach((_, i) => {
          _.forEach((_, j) => {
            if (_ !== 2) {
              G.Cir({
                x: (j + 1) * L,
                y: (i + 1) * L,
                radius: 0.4 * L,
                color: _ ? '#fff' : '#000',
              });
            }
          });
        });
      })
    );

    this.addUpdater(
      'render put',
      new Updater(() => {
        const L = this.root.L;
        if (!this.lastPut) return;
        const { x, y } = this.lastPut;
        G.Cir({
          x: (y + 1) * L,
          y: (x + 1) * L,
          radius: 0.1 * L,
          color: '#f00',
        });
      })
    );
  }
}

export default ChessBoard;
