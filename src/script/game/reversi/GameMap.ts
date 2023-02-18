import G from '../G';
import GameObject from '../GameObject';
import Updater from '../Updater';
import ReversiGame from './ReversiGame';

class GameMap extends GameObject {
  constructor(root: ReversiGame) {
    super(root);
  }

  protected onStart() {
    this.addUpdater(
      'render map',
      new Updater(() => {
        const L = this.root.L;
        const { rows, cols } = this.root as ReversiGame;

        G.Rect({
          y: 0,
          x: 0,
          ly: rows * L,
          lx: cols * L,
          color: '#008800',
        });

        for (let i = 0; i <= rows; ++i) {
          G.Seg({
            y0: i * L,
            x0: 0,
            y1: i * L,
            x1: cols * L,
            width: 0.01 * L,
            color: '#000000',
          });
        }

        for (let i = 0; i <= cols; ++i) {
          G.Seg({
            y0: 0,
            x0: i * L,
            y1: rows * L,
            x1: i * L,
            width: 0.01 * L,
            color: '#000000',
          });
        }
      })
    );

    this.addUpdater(
      'render chess',
      new Updater(() => {
        const L = this.root.L;
        (this.root as ReversiGame).g.forEach((_, i) => {
          _.forEach((x, j) => {
            if (x !== 2) {
              G.Cir({
                y: (i + 0.53) * L,
                x: (j + 0.5) * L,
                radius: 0.4 * L,
                color: x ? '#000000' : '#ffffff',
              });
              G.Cir({
                y: (i + 0.5) * L,
                x: (j + 0.5) * L,
                radius: 0.4 * L,
                color: x ? '#ffffff' : '#000000',
              });
            }
          });
        });
      })
    );

    this.addUpdater(
      'render last put',
      new Updater(() => {
        const L = this.root.L;
        const { r, c } = (this.root as ReversiGame).lastPut;
        if (r === -1) return;
        G.Rect({
          y: (r + 0.4) * L,
          x: (c + 0.4) * L,
          ly: 0.2 * L,
          lx: 0.2 * L,
          color: '#000088',
        });
      })
    );
  }
}

export default GameMap;
