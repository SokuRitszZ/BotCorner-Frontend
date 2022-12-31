import { Vector } from "./C";

class G {
  static context: CanvasRenderingContext2D;

  static Rect(options: {
    x: number;
    y: number;
    lx: number;
    ly: number;
    color?: string;
  }) {
    const { x, y, lx, ly, color } = options;
    const c = G.context;

    c.fillStyle = color || "#000";
    c.fillRect(x, y, lx, ly);
  }

  static Cir(options: {
    x: number;
    y: number;
    radius: number;
    color?: string;
  }) {
    const { x, y, radius, color } = options;
    const c = G.context;

    c.fillStyle = color || "#000";
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2);
    c.fill();
  }

  static Seg(options: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    width: number;
    color?: string;
  }) {
    const { x0, y0, x1, y1, width, color } = options;
    const c = G.context;
    c.save();
    c.lineWidth = width;
    c.strokeStyle = color || "#000";
    c.beginPath();
    c.moveTo(y0, x0);
    c.lineTo(y1, x1);
    c.closePath();
    c.stroke();
    c.restore();
  }

  static Segs(options: {
    ps: [number, number][];
    width: number;
    color?: string;
  }) {
    const { ps, width, color } = options;
    ps.reduce((pre, cur) => {
      this.Seg({
        x0: pre[0],
        y0: pre[1],
        x1: cur[0],
        y1: cur[1],
        width: width,
        color: color
      });
      return cur;
    });
  }

  static Poly(options: { ps: number[][]; color?: string }) {
    const { ps, color } = options;
    const c = G.context;
    c.beginPath();
    ps.forEach(([x, y], idx) => {
      if (!idx) c.moveTo(y, x);
      else c.lineTo(y, x);
    });
    c.closePath();
    c.fillStyle = color || "#000000";
    c.fill();
  }

  static StrokePoly(options: {
    ps: number[][];
    width?: number;
    color?: string;
  }) {
    const { ps, width, color } = options;
    const c = G.context;
    c.save();
    c.beginPath();
    ps.forEach(([x, y], idx) => {
      if (!idx) c.moveTo(y, x);
      else c.lineTo(y, x);
    });
    c.closePath();
    c.strokeStyle = color || "#000000";
    c.lineWidth = width || 1;
    c.stroke();
    c.restore();
  }

  static Hex(options: {
    x: number,
    y: number,
    radius: number,
    color?: string,
  }) {
    const {x, y, radius, color} = options;
    const v = new Vector(-radius, 0);
    const lst: [number, number][] = [];
    new Array(6).fill(0).forEach(() => {
      const nv = new Vector(x, y).add(v);
      lst.push([nv.x, nv.y]);
      v.rot(Math.PI / 3);
    });
    this.Poly({
      ps: lst,
      color: color,
    });
  }

  static StrokeHex(options: {
    x: number,
    y: number,
    radius: number,
    width?: number,
    color?: string,
  }) {
    const {x, y, radius, width, color} = options;
    const v = new Vector(-radius, 0);
    const lst: [number, number][] = [];
    new Array(6).fill(0).forEach(() => {
      const nv = new Vector(x, y).add(v);
      lst.push([nv.x, nv.y]);
      v.rot(Math.PI / 3);
    });
    this.StrokePoly({
      ps: lst,
      width: width,
      color: color,
    });
  }
}

export default G;