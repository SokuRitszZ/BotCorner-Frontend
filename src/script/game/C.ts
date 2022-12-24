import { IPosition } from "./snake/SnakeGame";

class C {
  static distance(pos1: IPosition, pos2: IPosition) {
    const dr = pos1.r - pos2.r;
    const dc = pos1.c - pos2.c;
    return Math.sqrt(dr * dr + dc * dc);
  }
}

export default C;