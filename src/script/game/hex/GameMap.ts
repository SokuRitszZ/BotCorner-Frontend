import G from '../G';
import GameObject from '../GameObject';
import Updater from '../Updater';
import HexGame from './HexGame';

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
      })
    );

    this.addUpdater(
      'render grid',
      new Updater(() => {
        const L = this.root.L;
        new Array(11).fill(0).forEach((_, i) => {
          new Array(11).fill(0).forEach((_, j) => {
            const { x, y } = HexGame.getPosition(i, j);
            G.StrokeHex({
              x: x * L,
              y: y * L,
              radius: 1 * L,
              width: 0.1 * L,
              color: '#111',
            });
          });
        });
      })
    );

    this.addUpdater(
      'render border',
      new Updater(() => {
        const L = this.root.L;
        let lst: [number, number][] = [];
        new Array(11).fill(0).forEach((_, idx) => {
          lst.push(
            [idx * 1.5 * L, (10 + idx * 0.866) * L],
            [(0.5 + idx * 1.5) * L, (10 + (idx + 1) * 0.866) * L]
          );
        });
        lst.push([16 * L, 19.526 * L]);
        G.Segs({
          ps: lst,
          width: 0.2 * L,
          color: '#f00',
        });
        lst = [];
        new Array(11).fill(0).forEach((_, idx) => {
          lst.push(
            [(32 - idx * 1.5) * L, (10 - idx * 0.866) * L],
            [(32 - 0.5 - idx * 1.5) * L, (10 - (idx + 1) * 0.866) * L]
          );
        });
        lst.push([16 * L, 0.474 * L]);
        G.Segs({
          ps: lst,
          width: 0.2 * L,
          color: '#f00',
        });
        lst = [];
        new Array(11).fill(0).forEach((_, idx) => {
          lst.push(
            [(32 - idx * 1.5) * L, (10 + idx * 0.866) * L],
            [(32 - 0.5 - idx * 1.5) * L, (10 + (idx + 1) * 0.866) * L]
          );
        });
        lst.push([16 * L, 19.526 * L]);
        G.Segs({
          ps: lst,
          width: 0.2 * L,
          color: '#00f',
        });
        lst = [];
        new Array(11).fill(0).forEach((_, idx) => {
          lst.push(
            [idx * 1.5 * L, (10 - idx * 0.866) * L],
            [(0.5 + idx * 1.5) * L, (10 - (idx + 1) * 0.866) * L]
          );
        });
        lst.push([16 * L, 0.474 * L]);
        G.Segs({
          ps: lst,
          width: 0.2 * L,
          color: '#00f',
        });
      })
    );

    this.addUpdater(
      'render first',
      new Updater(() => {
        const L = this.root.L;
        const { x, y } = HexGame.getPosition(1, 2);
        G.StrokeHex({
          x: x * L,
          y: y * L,
          radius: 0.8 * L,
          width: 0.4 * L,
          color: '#912',
        });
      })
    );
  }
}

export default GameMap;
