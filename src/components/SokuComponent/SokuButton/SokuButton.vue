<script setup lang="ts">
type PropsType = {
  click?: Function;
  disabled?: boolean;
  class?: string | string[];
};
const props = defineProps<PropsType>();
</script>

<template>
  <button class="--soku-btn" :class="props.class" @click="props.click" :disabled="props.disabled">
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import url('./style.scss');
</style>  