<script setup lang="ts">
import { ref } from 'vue';

type PropsType = {
  title: string;
  class?: string | string[];
};
const props = defineProps<PropsType>();

const isShown = ref(false);

function show() {
  isShown.value = true;
}

function hide() {
  isShown.value = false;
}

defineExpose({
  show,
  hide,
});
</script>

<template>
  <transition>
    <div v-if="isShown" class="--soku-modal-mask">
      <div class="absolute z-0 top-0 left-0 w-screen h-screen" @click="isShown = false"></div>
      <div class="modal relative z-10" :class="props.class">
        <h1 class="title">{{ props.title }}</h1>
        <main class="main-container">
          <slot></slot>
        </main>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import url('./style.scss');
.v-enter-active,
.v-leave-active {
  transition: 0.3s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
