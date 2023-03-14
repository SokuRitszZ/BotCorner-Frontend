<script setup lang="ts">
type PropsType = {
  class?: string | string[];
};
const props = defineProps<PropsType>();
</script>

<template>
  <div class="--soku-spinner" :class="props.class" />
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>