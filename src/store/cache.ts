import { getGamesApi, getLangsApi } from "@/api/cache";
import { defineStore } from "pinia";

export type ILang = {
  id: number;
  lang: string;
  suffix: string;
};

export type IGame = {
  id: number;
  title: string;
  description: string;
  name: string;
};

type ICacheStore = {
  langs: ILang[];
  games: IGame[];
};

const initState: ICacheStore = {
  langs: [],
  games: [],
};

const useCacheStore = defineStore("CacheStore", {
  state: (): ICacheStore => JSON.parse(JSON.stringify(initState)),
  actions: {
    getLangs() {
      if (!this.langs.length) {
        return getLangsApi().then((info: any) => {
          return info.langs;
        }).then(langs => {
          this.langs.push(...langs);
          return this.langs;
        });
      } else {
        return Promise.resolve(this.langs);
      }
    },
    getGames() {
      if (!this.games.length) {
        return getGamesApi().then((info: any) => {
          return info.games;
        }).then(games => {
          this.games.push(...games);
          return this.games;
        });
      } else {
        return Promise.resolve(this.games);
      }
    },
  },
});

export default useCacheStore;
