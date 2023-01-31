import Game from "@/script/game/Game";
import { GameBuilder } from "@/script/game/GameBuilder";
import { defineStore } from "pinia";
import { IUser } from "./userStore";

type IGameStore = {
  game: Game | null;
  events: { tag: string; callback: (data: any) => void }[];
  users: IUser[];
};

const initState: IGameStore = {
  game: null,
  events: [],
  users: [
    {
      id: 0,
      username: "unknown",
      avatar: "https://sdfsdf.dev/100x100.png",
    },
    {
      id: 0,
      username: "unknown",
      avatar: "https://sdfsdf.dev/100x100.png",
    },
  ],
};

const useGameStore = defineStore("GameStore", {
  state: (): IGameStore => ({ ...initState }),
  actions: {
    createGame(
      game: string,
      $parent: HTMLDivElement,
      $canvas: HTMLCanvasElement
    ) {
      this.game = GameBuilder(game)($parent, $canvas);
      this.events.forEach((event) => {
        this.game!.on(event.tag, event.callback);
      });
      return this;
    },
    clearEmit() {
      this.events = [];
    },
    on(tag: string, callback: (data: any) => void) {
      this.events.push({ tag, callback });
      if (this.game !== null) {
        this.game.on(tag, callback);
      }
      return this;
    },
  },
});

export default useGameStore;
