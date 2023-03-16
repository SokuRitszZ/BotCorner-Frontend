import GameWebSocket from '@/utils/GameWebSocket';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IUser } from './userStore';
import { ws_url, mode } from '@/config.json';

const useMatchStore = defineStore('MatchStore', () => {
  const server = ref<GameWebSocket>(new GameWebSocket());

  function connect(game: string, token: string) {
    server.value.connect(`${ws_url[mode]}/${game}/${token}`);
  }

  function statusConnect() {
    return server.value.getStatus();
  }

  const status = ref<'to-match' | 'matching' | 'matched' | 'game-starting'>(
    'to-match'
  );
  const idBotSelected = ref<number>(0);

  const idsBot = ref<(number | null)[]>([null]);

  function addIdBot() {
    idsBot.value.push(null);
  }

  function minusIdBot() {
    idsBot.value.pop();
  }

  const usersMatch = ref<IUser[]>([
    {
      id: 0,
      username: 'Miss Paula Klein',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg',
      signature: '',
    },
    {
      id: 1,
      username: 'Glen Hintz',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/924.jpg',
      signature: '',
    },
  ]);

  const okPrepare = ref<boolean[]>([false, true]);

  function getIndex(id: number) {
    return usersMatch.value.findIndex((u) => u.id === id);
  }

  return {
    server,
    connect,
    statusConnect,
    status,
    idBotSelected,
    idsBot,
    addIdBot,
    minusIdBot,
    usersMatch,
    okPrepare,
    getIndex,
  };
});

export default useMatchStore;
