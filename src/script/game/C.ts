class C {
  static distance(pos1: IPosition, pos2: IPosition) {
    const dr = pos1.x - pos2.x;
    const dc = pos1.y - pos2.y;
    return Math.sqrt(dr * dr + dc * dc);
  }

  static spdShift(p1: IPosition, p2: IPosition, t: number): {a: number, v: number} {
    const d = this.distance(p1, p2);
    return {
      v: 2 * d / t,
      a: 2 * d / (t * t),
    };
  }
}

export type IPosition = {
  x: number;
  y: number;
};

export default C;