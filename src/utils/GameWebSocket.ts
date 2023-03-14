class GameWebSocket {
  private server?: WebSocket;
  private events: { [key: string]: Function[] } = {};

  constructor() {}

  public connect(url: string) {
    this.server = new WebSocket(url);

    this.server.onopen = () => {
      window._alert('success', 'WebSocket连接成功');
      this.emit('open');
    }
    this.server.onclose = () => {
      window._alert('primary', 'WebSocket已关闭')
      this.emit('close');
    };
    this.server.onerror = (error) =>
      window._alert('danger', `WebSocket出错：${error}`);
    this.server.onmessage = (message) => {
      const msg = JSON.parse(message.data);
      this.emit(msg.action, msg.data);
    };
  }

  public getStatus() {
    return this.server && this.server.readyState;
  }

  public on(action: string | string[], fn: Function | Function[]) {
    if (Array.isArray(action)) {
      action.forEach((action) => this.on(action, fn));
    } else {
      if (!this.events[action]) this.events[action] = [];
      if (Array.isArray(fn)) {
        this.events[action].push(...fn);
      } else {
        this.events[action].push(fn);
      }
    }
    return this;
  }

  public off(action: string | string[], _fn?: Function | Function[]) {
    if (Array.isArray(action)) {
      action.forEach((action) => this.off(action));
    } else {
      let fns = this.events[action] || [];
      if (_fn) {
        if (Array.isArray(_fn)) {
          fns = fns.filter((fn) => !_fn.includes(fn));
        } else {
          fns = fns.filter((fn) => fn !== _fn);
        }
      } else fns = [];
      this.events[action] = fns;
    }
  }

  public emit(action: string, ...payload: any) {
    if (this.events[action]) {
      this.events[action].forEach((fn) => fn(...payload));
    }
  }

  public sendMessage(action: string, payload: any) {
    try {
      this.server!.send(
        JSON.stringify({
          action,
          data: payload,
        })
      );
    } catch (e) {
      window._alert('danger', '预期外的错误，请报Bug：1102');
    }
  }

  public close() {
    try {
      this.server!.close();
    } catch (e) {
      window._alert('danger', '预期外的错误，请报Bug：1103');
    }
  }
}

export default GameWebSocket;
