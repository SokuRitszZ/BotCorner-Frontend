<script setup lang="ts">
import DirectionController from '@/components/DirectionController.vue';
import useGameStore from '@/store/gameStore';
import useUserStore from '@/store/userStore';
import { onMounted, ref } from 'vue';
import useBindEvent from '@/hooks/useBindEvent';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useMatchStore from '@/store/matchStore';

const userStore = useUserStore();
const gameStore = useGameStore();

function disabledController(id: number) {
  return (
    !!idsBot.value[id] ||
    okStep.value[id] ||
    matchStore.usersMatch[id].id !== userStore.id
  );
}

function control(id: number, d: number) {
  matchStore.server!.sendMessage('set step', {
    id,
    d,
  });
}

const okStep = ref<[boolean, boolean]>([false, false]);

useBindEvent('set step', (data: any) => {
  const id = data.id;
  okStep.value[id] = true;
});

const idsBot = ref<[number, number]>([NaN, NaN]);

useBindEvent(['start single game', 'start multi game'], (data: any) => {
  idsBot.value = data.botIds.map((x?: number) => x || 0);
});

useBindEvent(['allow to control', 'set step truly'], () => {
  okStep.value = [false, false];
});

useBindEvent('tell result', () => {
  idsBot.value = [NaN, NaN];
});

onMounted(async () => {
  gameStore.clearEvents();

  gameStore.on('prepare', () => {
    okStep.value = [true, true];
  });

  gameStore.on('stop', () => {
    okStep.value = [true, true];
  });
});

onMounted(() => {
  if (gameStore.record) {
    okStep.value = [true, true];
  }
});

const matchStore = useMatchStore();
</script>
<template>
  <div class="h-fit w-full flex justify-around items-center mt-2">
    <div v-for="i in 2" :key="i" class="flex flex-col items-center gap-2">
      <SokuImgSkeleton
        class="avatar"
        :url="matchStore.usersMatch[i - 1].avatar"
      />
      <span class="text-xl font-thin">{{
        matchStore.usersMatch[i - 1].username
      }}</span>
      <DirectionController
        class="w-20 h-20"
        :active-class="
          ['text-white', (i === 1 && 'bg-red-700') || 'bg-blue-700'].join(' ')
        "
        :button-class="
          [
            (i === 1 && 'border-red-700') || 'border-blue-700',
            'border-[1px]',
          ].join(' ')
        "
        :disabled="disabledController(i - 1)"
        :all-active="okStep[i - 1]"
        @control="(d) => control(i - 1, d)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  --size: 100px;
  width: var(--size);
  height: var(--size);
}
</style>
