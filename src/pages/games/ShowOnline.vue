<script setup lang="ts">
import { IUser } from '@/store/userStore';
import leftpad from '@/utils/leftpad';
import { onMounted, ref } from 'vue';
import ImageHoverDetail from '@/components/ImageHoverDetail.vue';
import GameWebSocket from '@/utils/GameWebSocket';

type PropsType = {
  class?: string
  promise_server: Promise<GameWebSocket>
};
const props = defineProps<PropsType>();
const user_list = ref<IUser[]>([]);

onMounted(async () => {
  (await props.promise_server)
    .on({
      action: "init",
      callback: data => {
        user_list.value = data.users;
      }
    })
    .on({
      action: "join",
      callback: data => {
        user_list.value.push(data)
      } 
    })
    .on({
      action: "leave",
      callback: data => {
        user_list.value = user_list.value.filter(u => u.id !== data.id)
      }
    });
});
</script>

<template>
  <div :class="[props.class, 'p-3 flex justify-center']">
    <div class="h-[50px]"></div>
    <TransitionGroup>
      <ImageHoverDetail :key="u.id" v-for="(u, i) of user_list" :src="u.avatar" :class="[i && 'not-first' || undefined, 'w-[50px] h-[50px] border-gray-500 p-1']">
        <div> {{ '#' + leftpad(8, u.id) }} </div>
        <div> {{ u.username }} </div>
      </ImageHoverDetail>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">

.not-first {
  margin-left: 10px;
}

.v-move {
  transition: .4s
}

.v-enter-active,
.v-leave-active {
  overflow: hidden;
  transition: .4s;
}
.v-enter-from,
.v-leave-to {
  width: 0;
}
.v-enter-to,
.v-leave-from {
  width: 50px;
}
</style>