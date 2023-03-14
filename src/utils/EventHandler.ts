class EventHandler {
  private events: Map<string, Function[]> = new Map();
  
  constructor() {
    
  }

  on(action: string | string[], fn: Function) {
    if (Array.isArray(action)) {
      action.forEach(a => this.on(a, fn));
    }
    else {
      const fns = this.events.get(action) || [];
      fns.push(fn);
      this.events.set(action, fns);
    }
  }

  off(action: string | string[], fn?: Function) {
    if (Array.isArray(action)) {
      action.forEach(a => this.off(a, fn));
    }
    else {
      if (!fn) {
        this.clear(action);
      }
      else {
        const fns = (this.events.get(action) || []).filter(_fn => _fn !== fn);
        this.events.set(action, fns);
      }
    }
  }

  clear(action?: string) {
    if (!action) this.events = new Map();
    else {
      this.events.set(action, []);
    }
  }

  emit(action: string, ...args: any) {
    const fns = this.events.get(action) || [];
    fns.forEach(fn => fn(...args));
  }
}

export default EventHandler;
