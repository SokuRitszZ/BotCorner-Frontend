class G {
  static context: CanvasRenderingContext2D;
  
  static Rect(options: {
    x: number,
    y: number,
    lx: number,
    ly: number,
    color?: string
  }) {
    const { x, y, lx, ly, color } = options;
    const c = G.context;
    
    c.fillStyle = color || "#000";
    c.fillRect(x, y, lx, ly);
  }

  static Cir(options: {
    x: number,
    y: number,
    radius: number,
    color?: string
  }) {
    const {x, y, radius, color} = options;
    const c = G.context;

    c.fillStyle = color || "#000";
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2);
    c.fill();
  }

  static Seg(options: { 
    x0: number, 
    y0: number, 
    x1: number, 
    y1: number, 
    width: number, 
    color: string 
  }) {
    const {x0, y0, x1, y1, width, color} = options;
    const c = G.context;
    c.lineWidth = width;
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(y0, x0);
    c.lineTo(y1, x1);
    c.closePath();
    c.stroke();
  }
}

export default G;