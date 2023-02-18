export type IRecord = {
  initData: any;
  steps: string;
};

type IInitFunc = (initData: any) => void;
type INextFunc = (cur: { v: number }, record: IRecord) => string;
type IUpendFunc = (cur: { v: number }, record: IRecord) => void;
type ITag =
  | 'load'
  | 'play'
  | 'next'
  | 'upend'
  | 'stop'
  | 'pause'
  | 'continue'
  | 'set speed';

/**
 * 录像播放器
 */
class RecordPlayer {
  private timer: NodeJS.Timer | undefined = undefined;
  private record: IRecord | null = null;
  private cur: { v: number } = { v: 0 };
  private speed: number = 1;
  private events: {
    [key: string]: Function[];
  } = {};
  private step: number = 0;

  private _init: IInitFunc;
  private _next: INextFunc;
  private _upend: IUpendFunc;

  /**
   * 构造函数
   * @param _init 初始化器
   * @param _next 步进器
   * @param _upend 步退器
   */
  constructor(_init: IInitFunc, _next: INextFunc, _upend: IUpendFunc) {
    this._init = _init;
    this._next = _next;
    this._upend = _upend;
  }

  /**
   * 装载录像文件
   * @param record Record
   */
  public load(record: IRecord) {
    this.record = record;
    this.cur = { v: 0 };
    this.speed = 1;
    this.step = 0;

    const cur = { v: 0 };
    let cnt = 0;

    while (cur.v < this.record.steps.length) {
      ++cnt;
      this._next(cur, this.record);
    }

    clearTimeout(this.timer);
    this.emit('load', {
      max: cnt,
    });
    return this;
  }

  /**
   * 添加事件回调（订阅事件）
   * @param tag 事件标签
   * @param callback 回调
   * @returns 链式调用
   */
  public on(tag: ITag, callback: Function): this {
    if (!this.events[tag]) this.events[tag] = [];
    this.events[tag].push(callback);
    return this;
  }

  /**
   * 发布事件
   * @param tag 事件标签
   * @param args 传入参数
   * @returns 链式调用
   */
  public emit(tag: ITag, ...args: any): this {
    const fns = this.events[tag];
    if (!fns) return this;
    fns.forEach((fn) => fn(...args));
    return this;
  }

  /**
   * 清除所有事件
   */
  public clearEmit() {
    this.events = {};
  }

  /**
   * 开始播放
   * @returns 链式调用
   */
  public play() {
    if (!this.record) return;
    const act = () => {
      this.next();
      this.timer = setTimeout(() => {
        act();
      }, Math.floor(1000 / this.speed));
    };
    this._init(this.record.initData);
    this.timer = setTimeout(() => {
      act();
    }, Math.floor(1000 / this.speed));
    this.emit('play');
    return this;
  }

  /**
   * 下一步
   * @returns 链式调用
   */
  public next() {
    if (!this.record) return;
    const step = this._next(this.cur, this.record);
    ++this.step;
    this.emit('next', this.cur.v, step, this.step);
    if (this.cur.v >= this.record.steps.length) this.stop();
    return this;
  }

  /**
   * 上一步
   * @returns 链式调用
   */
  public upend() {
    if (!this.record) return;
    if (!this.step) return;
    this._upend(this.cur, this.record);
    --this.step;
    this.emit('upend', this.cur.v, this.step);
    return this;
  }

  /**
   * 暂停
   * @returns 链式调用
   */
  public pause() {
    clearTimeout(this.timer);
    this.emit('pause');
    return this;
  }

  public continue() {
    if (!this.record) return;
    const act = () => {
      this.next();
      this.timer = setTimeout(() => {
        act();
      }, Math.floor(1000 / this.speed));
    };
    this.timer = setTimeout(() => {
      act();
    }, Math.floor(1000 / this.speed));
    this.emit('continue');
  }

  /**
   * 停止
   * @returns 链式调用
   */
  public stop() {
    this.record = null;
    clearTimeout(this.timer);
    this.emit('stop');
    return this;
  }

  /**
   * 调速
   * @param speed 速度
   * @returns 链式调用
   */
  public setSpeed(speed: number) {
    this.speed = speed;
    this.emit('set speed', speed);
    return this;
  }
}

export default RecordPlayer;
