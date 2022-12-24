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
}

export default G;