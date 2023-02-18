import G from '../G';
import GameObject from '../GameObject';
import Updater from '../Updater';
import BackgammonGame from './BackgammonGame';

class GameMap extends GameObject {
  constructor(root: BackgammonGame) {
    super(root);
  }

  protected onStart() {
    this.addUpdater(
      'render map',
      new Updater(() => {
        const L = this.root.L;
        const { rows, cols } = this.root as BackgammonGame;
        G.Rect({
          y: 0,
          x: 0,
          ly: rows * L,
          lx: cols * L,
          color: '#e3ac72',
        });
      })
    );
    this.addUpdater(
      'render triangle',
      new Updater(() => {
        const L = this.root.L;

        for (let i = 0; i < 6; ++i) {
          const y = i * L;
          // 上方
          G.Poly({
            ps: [
              [0, y],
              [0, y + L],
              [5 * L, y + 0.5 * L],
            ],
            color: i % 2 ? '#800' : '#ddd',
          });
          G.Poly({
            ps: [
              [0, y + 7 * L],
              [0, y + 8 * L],
              [5 * L, y + 7.5 * L],
            ],
            color: i % 2 ? '#800' : '#ddd',
          });

          // 下方
          G.Poly({
            ps: [
              [11 * L, y],
              [11 * L, y + L],
              [6 * L, y + 0.5 * L],
            ],
            color: i % 2 ? '#ddd' : '#800',
          });
          G.Poly({
            ps: [
              [11 * L, y + 7 * L],
              [11 * L, y + 8 * L],
              [6 * L, y + 7.5 * L],
            ],
            color: i % 2 ? '#ddd' : '#800',
          });
        }
      })
    );

    this.addUpdater(
      'render slot',
      new Updater(() => {
        const L = this.root.L;
        G.StrokePoly({
          ps: [
            [0, 13 * L],
            [0, 14 * L],
            [5 * L, 14 * L],
            [5 * L, 13 * L],
          ],
          width: 0.05 * L,
          color: '#800',
        });
        G.StrokePoly({
          ps: [
            [6 * L, 13 * L],
            [6 * L, 14 * L],
            [11 * L, 14 * L],
            [11 * L, 13 * L],
          ],
          width: 0.05 * L,
          color: '#ddd',
        });
      })
    );
  }
}

export default GameMap;
