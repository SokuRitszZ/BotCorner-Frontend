<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

type PropsType = {
  src: string
  class?: any
  boardClass?: string
};
const props = defineProps<PropsType>();
const $img = ref<HTMLImageElement>();
const $board = ref<HTMLDivElement>();
const status = ref<"show" | "hide">("hide");

const hover = async () => {
  status.value = "show";
  await nextTick();
  if (!$img.value || !$board.value) return;
  const top = $img.value.getBoundingClientRect().bottom;
  const left = $img.value.getBoundingClientRect().left;
  $board.value.style.setProperty('top', `${top}px`);
  $board.value.style.setProperty('left', `${left}px`);
};

const leave = () => {
  status.value = "hide";
};
</script>

<template>
  <div>
    <div ref="$board" @mouseenter="hover" @mouseleave="leave" v-if="status === 'show'" :class="boardClass"
      class="fixed p-3 bg-gray-50 opacity-80 rounded-2xl translate-y-[10px] left-0 bottom-0 z-50 h-fit">
      <slot></slot>
    </div>
    <div class="flex flex-col justify-center h-auto">
      <img ref="$img" @mouseenter="hover" @mouseleave="leave" :class="props.class" :src="props.src" alt="img">
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes show {
  from {
    @apply translate-y-0 opacity-0;
  }

  to {
    @apply translate-y-[10px] opacity-75;
  }
}

.show-detail {
  transition: .2s;
}
</style>