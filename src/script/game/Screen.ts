import G from './G';
import Game from './Game';
import GameObject from './GameObject';
import Updater from './Updater';

class Screen extends GameObject {
  private screenOptions: [number, number] = [8, 8];
  private $container: HTMLDivElement;

  public L: number = 0;

  constructor(root: Game, $container: HTMLDivElement) {
    super(root);

    this.$container = $container;
  }

  public config(options: [number, number]) {
    this.screenOptions = options;
    return this;
  }

  protected onStart() {
    this.addUpdater(
      'get scale',
      new Updater(() => {
        const c = G.context;
        const { clientHeight: height, clientWidth: width } = this.$container;
        this.L = Math.min(
          width / this.screenOptions[0],
          height / this.screenOptions[1]
        );
        this.L = Math.floor(this.L);
        c.canvas.width = this.L * this.screenOptions[0];
        c.canvas.height = this.L * this.screenOptions[1];
      })
    );
    this.addUpdater(
      'render screen',
      new Updater(() => {
        const L = this.L;
        G.Rect({
          x: 0,
          y: 0,
          lx: L * this.screenOptions[0],
          ly: L * this.screenOptions[1],
        });
      })
    );
  }
}

export default Screen;
