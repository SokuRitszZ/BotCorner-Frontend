import BackgammonGame from './backgammon/BackgammonGame';
import Game from './Game';
import GomokuGame from './gomoku/GomokuGame';
import HexGame from './hex/HexGame';
import ReversiGame from './reversi/ReversiGame';
import SnakeGame from './snake/SnakeGame';

export function GameBuilder(
  game: string
): ($parent: HTMLDivElement, $canvas: HTMLCanvasElement) => Game | null {
  return ($parent: HTMLDivElement, $canvas: HTMLCanvasElement) => {
    switch (game) {
      case 'snake':
        return new SnakeGame($parent, $canvas);
      case 'reversi':
        return new ReversiGame($parent, $canvas);
      case 'backgammon':
        return new BackgammonGame($parent, $canvas);
      case 'hex':
        return new HexGame($parent, $canvas);
      case 'gomoku':
        return new GomokuGame($parent, $canvas);
      default:
        return null;
    }
  };
}
