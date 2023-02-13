<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import { IUser } from '@/store/cacheStore';
import useGameStore from '@/store/gameStore';
export type IPlaying = {
  uuid: string
  bots: any[]
  users: IUser[]
};

type PropsType = {
  list_play: IPlaying[]
};
const props = defineProps<PropsType>();

const emit = defineEmits(['watch']);
const gameStore = useGameStore();

function toWatch(uuid: string) {
  const playing: IPlaying | undefined = props.list_play.find(p => p.uuid === uuid);
  if (!playing) return ;
  const users = playing.users;
  if (users.length === 1) users.unshift(users[0]);
  gameStore.users = users;
  emit('watch', uuid);
}
</script>

<template>
  <div :class="class">
    <div v-if="list_play.length === 0" class="text-purple-400 text-xl text-center">
      似乎还没有任何比赛正在进行
    </div>
    <TransitionGroup v-else>
      <div class="bg-purple-700 p-3 w-full rounded-xl flex justify-between items-center" :class="{ 'mt-3': index > 0 }" :key="playing.uuid"
        v-for="(playing, index) in props.list_play">
        <h1 class="text-lg text-purple-300"> {{ playing.users.map(u => ' ' + u.username + ' ').join('与') + "在进行一场比赛" }} </h1>
        <Icon @click="toWatch(playing.uuid)" class="
        hover:text-purple-800
        active:text-purple-900
        " type="play" :size="24" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">

</style>