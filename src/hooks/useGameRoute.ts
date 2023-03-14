import useCacheStore from "@/store/cacheStore";
import useRouteStore from "@/store/routeStore";
import toWord from "@/utils/toWord";
import { useRouter } from "vue-router";

export default async function useGameRoute() {
  const cacheStore = useCacheStore();
  const routeStore = useRouteStore();
  const router = useRouter();

  const games = await cacheStore.getGames;
  if (!routeStore.hasAddRoute) {
    routeStore.hasAddRoute = true;
    games.forEach(game => router.addRoute({
      path: `/game/${game.title}`,
      name: `game-${game.title}`,
      component: () => import(`@/pages/games/${toWord(game.title)}Game.vue`),
    }));
  }
}