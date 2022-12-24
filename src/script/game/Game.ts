import G from "./G";
import GameObject from "./GameObject";
import Screen from "./Screen";

class Game {
  private $parent: HTMLDivElement;
  private $canvas: HTMLCanvasElement;
  private screen: Screen;
  private gameObjects: GameObject[] = [];
  private engine: number = 0;

  public get L() {
    return this.screen.L;
  }
  private set L(val) {

  }

  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    this.$parent = $parent;
    this.$canvas = $canvas;
    
    G.context = $canvas.getContext('2d')!;
    this.screen = new Screen(this, $parent);
  }

  public parseAndAct(data: any) {

  }

  public setStep(data: any) {}

  public setScreen(options: [number, number]) {
    this.screen.config(options);
    return this;
  }

  public addObj(obj: GameObject) {
    this.gameObjects.push(obj);
  }

  public removeObj(obj: GameObject) {
    this.gameObjects = this.gameObjects.filter(_obj => _obj !== obj);
  }
  
  public prepare(options: {
    mode: "single" | "multi" | "record",
    initData: any
  }) {
    // abstract
    return this;
  }

  public start() {
    let lastTimestamp = 0;
    const engine = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      else {
        this.gameObjects.forEach(obj => {
          if (!obj.started) {
            obj.start();
          } else {
            obj.dTime = timestamp - lastTimestamp;
            obj.update();
          }
        });
      }
      lastTimestamp = timestamp;
      window.requestAnimationFrame(engine);
    };
    this.engine = window.requestAnimationFrame(engine);
    // abstract
    return this;
  }

  public stop() {
    // abstract
    this.gameObjects.forEach(obj => obj.destroy());
    window.cancelAnimationFrame(this.engine);
    return this;
  }
}

export default Game;