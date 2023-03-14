import Game from '@/script/game/Game';
import { GameBuilder } from '@/script/game/GameBuilder';
import { IRecord } from '@/utils/RecordPlayer';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useGameStore = defineStore('GameStore', () => {
  const game = ref<Game | null>(null);
  const events = ref<{
    [key: string]: Function[];
  }>({});

  function createGame(
    nameGame: string,
    domParent: HTMLDivElement,
    domCanvas: HTMLCanvasElement
  ) {
    game.value = GameBuilder(nameGame)(domParent, domCanvas);
    Object.keys(events.value).forEach((k) => {
      const fns = events.value[k];
      fns.forEach((fn) => game.value!.on(k, fn));
    });
  }

  function clearEvents() {
    events.value = {};
  }

  function on(tag: string, fn: Function) {
    if (game.value) {
      game.value.on(tag, fn);
    }
    const fns = events.value[tag] || [];
    fns.push(fn);
    events.value[tag] = fns;
  }

  const record = ref<IRecord>();

  return {
    record,
    game,
    createGame,
    clearEvents,
    on,
  };
});

export default useGameStore;
