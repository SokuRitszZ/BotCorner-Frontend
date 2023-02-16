import { IRecord } from "@/utils/RecordPlayer";
import G from "./G";
import GameObject from "./GameObject";
import Screen from "./Screen";

type IAction = {
  step: string;
  fn: Function;
};

type IMode = "single" | "multi" | "record" | "watch";

abstract class Game {
  public mode: IMode = "single";

  protected $parent: HTMLDivElement;
  protected $canvas: HTMLCanvasElement;
  protected stack: IAction[] = [];

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

  abstract next(cur: { v: number }, record: IRecord): string;

  public upend(cur: { v: number }): void {
    if (!this.stack.length) return;
    const action = this.stack.pop();
    cur.v -= action!.step.length;
    action!.fn();
  }

  public on(tag: string, callback: Function) {
    if (!this.callbacks[tag]) this.callbacks[tag] = [];
    this.callbacks[tag].push(callback);
  }

  public emit(tag: string, ...args: any) {
    if (!this.callbacks[tag]) return;
    this.callbacks[tag].forEach((fn) => fn(...args));
  }

  abstract parseAndAct(step: string): void;

  public prepare(options: { mode: IMode; initData: any }) {
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

  public stop() {
    // abstract
    this.gameObjects.forEach((obj) => obj.destroy());
    window.cancelAnimationFrame(this.engine);

    this.onStop();
    return this;
  }

  abstract _setStep(data: any): void;

  abstract _prepare(options: { mode: IMode; initData: any }): void;

  abstract onStart(): void;

  abstract onStop(): void;

  protected memo(step: string, fn: Function) {
    this.stack.push({ step, fn });
  }
}

export default Game;
