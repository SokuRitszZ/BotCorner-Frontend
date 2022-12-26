<template>
  <div class="relative flex flex-col justify-center">
    <img @mouseenter="hover" @mouseleave="leave" :class="props.class" :src="props.src" alt="img">
    <Transition>
      <div @mouseenter="hover" @mouseleave="leave" v-if="status === 'show'" :class="boardClass" class="absolute p-3 bg-gray-50 opacity-50 rounded-2xl left-0 bottom-0 translate-y-[110%] z-50">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { HTMLAttributes, ref } from 'vue';

type PropsType = {
  src: string
  class?: string
  boardClass?: string
};
const props = defineProps<PropsType>();

const status = ref<"show" | "hide">("hide");

const hover = () => {
  status.value = "show";
};

const leave = () => {
  status.value = "hide";
};
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: .2s;
}
.v-enter-from,
.v-leave-to {
  @apply translate-y-full opacity-0;
}
.v-enter-to,
.v-leave-from {
  @apply translate-y-[110%] opacity-50;
}

</style>