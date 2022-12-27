import { IRecord } from "@/utils/RecordPlayer";
import G from "./G";
import GameObject from "./GameObject";
import Screen from "./Screen";

class Game {
  public mode: "single" | "multi" | "record" = "single";

  protected $parent: HTMLDivElement;
  protected $canvas: HTMLCanvasElement;

  private screen: Screen;
  private gameObjects: GameObject[] = [];
  private engine: number = 0;
  private callbacks: { [key: string]: Function[] } = {};

  public get L() {
    return this.screen.L;
  }

  private set L(val) {}

  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    this.$parent = $parent;
    this.$canvas = $canvas;

    G.context = $canvas.getContext("2d")!;
    this.screen = new Screen(this, $parent);
  }

  public next(cur: { v: number }, record: IRecord) {
    return "";
  }

  public on(tag: string, callback: Function) {
    if (!this.callbacks[tag]) this.callbacks[tag] = [];
    this.callbacks[tag].push(callback);
  }

  public emit(tag: string, ...args: any) {
    if (!this.callbacks[tag]) return;
    this.callbacks[tag].forEach((fn) => fn(...args));
  }

  public parseAndAct(data: any) {}

  public prepare(options: {
    mode: "single" | "multi" | "record";
    initData: any;
  }) {
    this.mode = options.mode;
    this._prepare(options);
    this.emit("prepare", options);
    return this;
  }

  public setStep(data: any) {
    this._setStep(data);
    this.emit("set step", data);
    return this;
  }

  protected _setStep(data: any) {
    return this;
  }

  public setScreen(options: [number, number]) {
    this.screen.config(options);
    return this;
  }

  public addObj(obj: GameObject) {
    this.gameObjects.push(obj);
    return this;
  }

  public removeObj(obj: GameObject) {
    this.gameObjects = this.gameObjects.filter((_obj) => _obj !== obj);
    return this;
  }

  protected _prepare(options: {
    mode: "single" | "multi" | "record";
    initData: any;
  }) {
    // abstract
    return this;
  }

  public start() {
    let lastTimestamp = 0;
    const engine = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      else {
        this.gameObjects.forEach((obj) => {
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

    this.onStart();
    return this;
  }

  protected onStart() {}

  public stop() {
    // abstract
    this.gameObjects.forEach((obj) => obj.destroy());
    window.cancelAnimationFrame(this.engine);

    this.onStop();
    return this;
  }

  protected onStop() {}
}

export default Game;