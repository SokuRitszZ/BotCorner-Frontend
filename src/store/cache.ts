import { getBotsApi } from "@/api/bots";
import { getGamesApi, getLangsApi } from "@/api/cache";
import { getRatingsApi } from "@/api/ratings";
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

export type IBot = {
  id: number;
  title: string;
  description: string;
  userId: number;
  createTime: Date;
  modifyTime: Date;
  gameId: number;
  langId: number;
  code?: string;
};

export type IUser = {
  id: number
  username: string 
  headIcon: string
};

export type IRating = {
  rating: number
} & IUser;

type ICacheStore = {
  langs: ILang[];
  games: IGame[];
  bots: IBot[];
  ratings: {
    [key: string]: IRating[]
  };
};

const initState: ICacheStore = {
  langs: [],
  games: [],
  bots: [],
  ratings: {},
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
        return getGamesApi()
        .then(info => (info as any).games)
        .then(games => {
          this.games.push(...games);
          return this.games;
        });
      } else {
        return Promise.resolve(this.games);
      }
    },
    getBots() {
      if (!this.bots.length) {
        return getBotsApi()
        .then(info => (info as any).bots)
        .then(bots => {
          this.bots.push(...bots);
          return this.bots;
        });
      } else {
        return Promise.resolve(this.bots);
      }
    },
    getRatings(game: string) {
      if (!this.ratings[game]) {
        return getRatingsApi(game)
          .then(info => (info as any).ratings)
          .then(ratings => {
            this.ratings[game] = ratings;
            return this.ratings[game];
          });
      } else {
        return Promise.resolve(this.ratings[game]);
      }
    },
    emptyBots() {
      this.bots = [];
    },
    getLang(langId: number) {
      return this.langs.find(lang => lang.id === langId)!.lang;
    },
    getGame(gameId: number) {
      return this.games.find(game => game.id === gameId)!.name;
    },
  },
});

export default useCacheStore;
