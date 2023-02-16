import Game from "./Game";
import Updater from "./Updater";

class GameObject {
  public started: boolean = false;
  public destroyed: boolean = false;
  public trulyDeltaTime: number = 0;

  protected root: Game;

  private updaters: { [key: string]: Updater } = {};

  get dTime() {
    return this.trulyDeltaTime / 1000;
  }
  set dTime(val: number) {
    this.trulyDeltaTime = val;
  }

  constructor(root: Game) {
    this.root = root;

    root.addObj(this);
  }

  public addUpdater(tag: string, upd: Updater) {
    this.updaters[tag] = upd;
  }

  public delUpdater(tag: string) {
    delete this.updaters[tag];
  }

  public start() {
    if (this.started) return;
    this.onStart();

    this.started = true;

    this.afterStart();
  }

  public destroy() {
    if (this.destroyed) return;
    this.onDestroy();

    this.root.removeObj(this);
    this.destroyed = true;

    this.afterDestroy();
  }

  protected onStart() {}

  protected afterStart() {}

  public update() {
    Object.values(this.updaters).forEach((upd) => upd.fn());
  }

  protected onDestroy() {}

  protected afterDestroy() {}
}

export default GameObject;
