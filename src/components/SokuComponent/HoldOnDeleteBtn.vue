<script setup lang="ts">
import { ref } from 'vue';
import BootstrapIcon from '../BootstrapIcon.vue';

const timer = ref<any>();

const emit = defineEmits(['click'])

function start() {
  timer.value = setTimeout(() => {
    emit('click');
  }, 1000);
}

function cancel() {
  clearTimeout(timer.value);
  timer.value = undefined;
}
</script>

<template>
  <button @click.stop @mousedown.stop="start" @mouseup.stop="cancel" class="relative">
    <BootstrapIcon :size="24" type="dash" class="w-fit text-red-700" />
    <transition>
      <div v-if="timer" class="progress z-50 absolute top-[30px] left-0 border-red-700 border-[1px] w-[100px] h-[20px]" />
    </transition>
  </button>
</template>

<style scoped lang="scss">
button {
  .progress {
    transform: translateX(calc(-50% + 12px));
    @apply rounded-sm;
  }
  &:active .progress {
    background-image: linear-gradient(to left, #fff0 0%, #fff0 50%, #f00 50%, #f00 100%);
    background-size: 200% 100%;
    background-position: 100%;
    animation: 1s confirmation linear forwards;
  }
}

@keyframes confirmation {
  from {
    background-position: 100%;
  }
  to {
    background-position: 0%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: .1s;
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
