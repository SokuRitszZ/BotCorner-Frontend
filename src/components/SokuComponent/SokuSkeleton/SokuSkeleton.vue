<script setup lang="ts">
import { ref } from 'vue';

type PropsType = {
  class?: string[] | string;
  isLoading: boolean;
};
const props = defineProps<PropsType>();
const dom = ref<HTMLDivElement>();

</script>

<template>
  <div
    ref="dom"
    class="--soku-skeleton"
    :class="[props.class, (props.isLoading && 'loading') || '']"
  >
  <transition>
    <slot v-if="!props.isLoading"></slot>
  </transition>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');

.v-enter-active,
.v-leave-active {
  transition: .5s;
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
