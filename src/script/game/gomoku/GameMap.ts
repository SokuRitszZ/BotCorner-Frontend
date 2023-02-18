import G from '../G';
import GameObject from '../GameObject';
import Updater from '../Updater';
import HexGame from './GomokuGame';

class GameMap extends GameObject {
  constructor(root: HexGame) {
    super(root);
  }

  protected onStart() {
    this.addUpdater(
      'render background',
      new Updater(() => {
        const L = this.root.L;
        G.Rect({
          y: 0,
          x: 0,
          ly: 32 * L,
          lx: 20 * L,
          color: '#cca',
        });
        G.Cir({
          x: 8 * L,
          y: 8 * L,
          radius: 0.2 * L,
        });
      })
    );

    this.addUpdater(
      'render border',
      new Updater(() => {
        const L = this.root.L;
        new Array(15).fill(0).forEach((_, i) => {
          G.Seg({
            x0: (i + 1) * L,
            y0: L,
            x1: (i + 1) * L,
            y1: 15 * L,
            width: 0.03 * L,
          });
          G.Seg({
            x0: L,
            y0: (i + 1) * L,
            x1: 15 * L,
            y1: (i + 1) * L,
            width: 0,
          });
        });
      })
    );
  }
}

export default GameMap;
