<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import { IUser } from '@/store/cacheStore';
export type IPlaying = {
  uuid: string
  bots: any[]
  users: IUser[]
};

type PropsType = {
  class?: string
  list_play: IPlaying[]
};
const props = defineProps<PropsType>();

const emit = defineEmits(['watch']);
</script>

<template>
  <div :class="props.class">
    <div v-if="list_play.length === 0" class="text-purple-400 text-xl text-center">
      似乎还没有任何比赛正在进行
    </div>
    <TransitionGroup v-else>
      <div class="bg-purple-700 p-3 w-full rounded-xl flex justify-between items-center" :class="{ 'mt-3': index > 0 }" :key="playing.uuid"
        v-for="(playing, index) in props.list_play">
        <h1 class="text-lg text-purple-300"> {{ playing.users.map(u => ' ' + u.username + ' ').join('与') + "在进行一场比赛" }} </h1>
        <Icon @click="emit('watch', playing.uuid)" class="
        hover:text-purple-800
        active:text-purple-900
        " type="play" :size="24" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">

</style>