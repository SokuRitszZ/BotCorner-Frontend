class Updater {
  public fn: (...args: any) => void;

  constructor(fn: (...args: any) => void) {
    this.fn = fn;
  }
}

export default Updater;
