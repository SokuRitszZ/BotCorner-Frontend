<template>
  <div class="h-2/5 w-full flex flex-col-reverse">
    <div class="w-full flex justify-between items-center">
      <DirectionController :all-active="ok[0]" :disabled="disabledController(0)" @control="d => control(0, d)"
        class="w-32 h-32" active-class="bg-red-700 text-white"
        button-class="border-red-600 border-[1px] hover:bg-red-600 hover:text-white transition drop-shadow-xl" />
      <img class="h-24 rounded-full" :src="userData[0].headIcon" alt="avatar">
    </div>
    <div class="my-2 max-h-[150px] overflow-scroll flex flex-wrap justify-start gap-1">
      <TransitionGroup>
        <Icon :size="24" :key="chose[0].length - index" :class="index === 0 ? 'text-red-700' : ''" :type="getType(dir)"
          v-for="(dir, index) in chose[0]" />
      </TransitionGroup>
    </div>
  </div>
  <div class="h-2/5 w-full">
    <div class="w-full flex justify-between items-center">
      <DirectionController :all-active="ok[1]" :disabled="disabledController(1)" @control="d => control(1, d)"
        class="w-32 h-32" active-class="bg-blue-700 text-white"
        button-class="border-blue-600 border-[1px] hover:bg-blue-600 hover:text-white transition drop-shadow-xl" />
      <img class="h-24 rounded-full" :src="userData[1].headIcon" alt="avatar">
    </div>
    <div class="my-2 max-h-[150px] overflow-scroll text-xl flex gap-1 justify-start flex-wrap">
      <TransitionGroup>
        <Icon :size="24" :key="chose[1].length - index" :class="index === 0 ? 'text-blue-700' : ''" :type="getType(dir)"
          v-for="(dir, index) in chose[1]" />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import DirectionController from '@/components/DirectionController.vue';
import Icon from '@/components/Icon.vue';
import { IUser } from '@/store/cacheStore';
import useGameStore from '@/store/gameStore';
import useUserStore from '@/store/userStore';
import GameWebSocket from '@/utils/GameWebSocket';
import { onMounted, ref } from 'vue';

type PropsType = {
  promise_server: Promise<GameWebSocket>;
};
const userStore = useUserStore();
const gameStore = useGameStore();
const props = defineProps<PropsType>();
const botIds = ref<number[]>([1, 1]);
const userData = ref<IUser[]>(new Array<IUser>(2).fill({} as IUser).map(x => userStore.$state as IUser));
const ok = ref<boolean[]>([false, false]);
const server = ref<GameWebSocket>();
const chose = ref<number[][]>([[], []]);

const disabledController = (id: number) => botIds.value[id] !== 0 || ok.value[id] || userData.value[id].id !== userStore.id;

const getType = (d: number) => {
  switch (d) {
    case 0: return "up";
    case 1: return "right";
    case 2: return "down";
    case 3: return "left";
    default: return "primary";
  }
};

const control = (id: number, d: number) => {
  if (!server.value) return;
  server.value?.sendMessage({
    action: 'set step',
    data: { id, d }
  });
};
onMounted(async () => {
  server.value = await props.promise_server;
  server.value
    .on({
      action: "set step",
      callback: data => {
        const id = data.id;
        ok.value[id] = true;
      }
    })
    .on({
      action: ["start single game", "start multi game"],
      callback: data => {
        botIds.value = data.botIds;
      }
    })
    .on({
      action: "allow to control",
      callback: data => {
        ok.value = [false, false];
      }
    })
    .on({
      action: "set step truly",
      callback: data => {
        ok.value = ok.value.map(x => false);
      }
    })
    .on({
      action: "tell result",
      callback: data => {
        botIds.value = [1, 1];
      }
    })
    .on({
      action: "make match",
      callback: data => {
        userData.value = data.userData;
      }
    });
  gameStore
    .on("set step", (data: any) => {
      const {id, d} = data;
      chose.value[id].unshift(d);
    })
    .on("prepare", (data: any) => {
        ok.value = [true, true];
        chose.value = [[], []];
    });
});

</script>
<style scoped lang="scss">
.v-move {
  transition: 0.5s;
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s;
}

.v-enter-from,
.v-leave-to {
  @apply scale-0
}

.v-enter-to,
.v-leave-from {
  @apply scale-100
}
</style>

