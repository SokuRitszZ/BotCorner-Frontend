<script setup lang="ts">
type PropsType = {
  type?: string;
  class?: string;
  style?: string;
};
const props = defineProps<PropsType>();
const emit = defineEmits(['click']);

const emitClick = (e: MouseEvent) => {
  emit('click', e);
};
</script>

<template>
  <button
    :class="[
      {
        'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white':
          !type || type === 'normal',
        'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white':
          type === 'success',
        'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white':
          type === 'danger',
      },
      props.class,
    ]"
    :style="props.style"
    @click="(e) => emitClick(e)"
    class="rounded-md w-fit h-fit"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss"></style>
