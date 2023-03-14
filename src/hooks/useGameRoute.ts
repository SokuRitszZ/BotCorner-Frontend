import useCacheStore from "@/store/cacheStore";
import useRouteStore from "@/store/routeStore";
import toWord from "@/utils/toWord";
import { Router } from "vue-router";

export default async function useGameRoute(router: Router) {
  const cacheStore = useCacheStore();
  const routeStore = useRouteStore();

  const games = await cacheStore.getGames;
  if (!routeStore.hasAddRoute) {
    routeStore.hasAddRoute = true;
    games.forEach(game => router.addRoute('game-intro', {
      path: `/game/intro/${game.id}`,
      name: `game-${game.title}`,
      component: () => import(`@/pages/games/${toWord(game.title)}Game.vue`),
      meta: {
        id: game.id,
      }
    }));
  }
}