class C {
  static distance(pos1: IPosition, pos2: IPosition) {
    const dr = pos1.x - pos2.x;
    const dc = pos1.y - pos2.y;
    return Math.sqrt(dr * dr + dc * dc);
  }
}

export default C;