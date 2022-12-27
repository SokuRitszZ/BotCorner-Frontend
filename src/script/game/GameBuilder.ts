import Game from "./Game";
import ReversiGame from "./reversi/ReversiGame";
import SnakeGame from "./snake/SnakeGame";

export function GameBuilder(game: string): ($parent: HTMLDivElement, $canvas: HTMLCanvasElement) => Game {
  return ($parent: HTMLDivElement, $canvas: HTMLCanvasElement) => {
    switch (game) {
      case "snake": return new SnakeGame($parent, $canvas);
      case "reversi": return new ReversiGame($parent, $canvas);
      default: return new Game($parent, $canvas);
    }
  }
}