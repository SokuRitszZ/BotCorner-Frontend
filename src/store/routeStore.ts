import { defineStore } from 'pinia';
import { ref } from 'vue';

const useRouteStore = defineStore('RouteStore', () => {
  const hasAddRoute = ref<boolean>(false);

  return {
    hasAddRoute,
  }
});

export default useRouteStore;
