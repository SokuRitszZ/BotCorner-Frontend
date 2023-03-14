import useMatchStore from '@/store/matchStore';
import { onMounted, onUnmounted } from 'vue';

async function useBindEvent(tag: string | string[], fn: Function) {
  const matchStore = useMatchStore();
  onMounted(() => {
    matchStore.server!.on(tag, fn);
  });
  onUnmounted(() => {
    matchStore.server!.off(tag, fn);
  });
}

export default useBindEvent;
