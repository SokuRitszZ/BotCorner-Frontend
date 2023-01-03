type IActionMessage = {
  action: string;
  data: any;
};

type ICallback = {
  action: string | string[];
  callback: (data: any) => void;
};

class GameWebSocket {
  private server: WebSocket;
  private callbackMap: {[key: string]: Function[]};

  constructor(url: string) {
    this.server = new WebSocket(url);
    this.callbackMap = {};

    this.server.onopen = () => window._alert("success", "WebSocket连接成功");
    this.server.onclose = () => window._alert("primary", "WebSocket已关闭");
    this.server.onerror = (error) => window._alert("danger", `WebSocket出错：${error}`);
    this.server.onmessage = (message) => this.emit(JSON.parse(message.data)); ;
  }

  /**
   * 订阅者 
   * @param {ICallback} callback 
   * @returns 
   */
  public on(callback: ICallback) {
    const action = callback.action;
    if (action instanceof Array) {
      action.forEach(action => this.on({
        action, 
        callback: callback.callback
      }))
    } else {
      if (!this.callbackMap[action]) 
      this.callbackMap[action] = [];
      this.callbackMap[callback.action as string].push(callback.callback);
    }
    return this;
  }

  /**
   * 发布者 (本来是设置成private，但有可能信息不通过ws传过来，需要手动发布信息，因此设置成public)
   * @param {IActionMessage} message 
   */
  public emit(message: IActionMessage) {
    const action = message.action;
    if (this.callbackMap[action]) {
      this.callbackMap[action].forEach(fn => fn(message.data));
    } else {
      // window._alert("danger", `执行回调失败：不存在${message.action}`);
    }
  }

  public sendMessage(message: IActionMessage) {
    this.server.send(JSON.stringify(message));
  }

  public close() {
    this.server.close();
  }
}

export default GameWebSocket;
