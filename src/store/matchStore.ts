import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IUser } from './userStore';

const useMatchStore = defineStore('MatchStore', () => {
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

  const usersMatch = ref<IUser[]>([{
    id: 0,
    username: 'Miss Paula Klein',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg',
  }, {
    id: 1,
    username: 'Glen Hintz',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/924.jpg',
  }]);
  const okPrepare = ref<boolean[]>([false, true]);

  return {
    status,
    idBotSelected,
    idsBot,
    addIdBot,
    minusIdBot,
    usersMatch,
    okPrepare,
  };
});

export default useMatchStore;
