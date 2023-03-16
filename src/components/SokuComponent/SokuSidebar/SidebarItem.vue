<script setup lang="ts">
type PropsType = {
  to: string;
};
const props = defineProps<PropsType>();
</script>

<template>
  <router-link :to="props.to" class="router-link">
    <slot></slot>
  </router-link>
</template>

<style scoped lang="scss">
.router-link {
  @apply flex items-center;
  @apply w-full h-[50px];
  @apply pl-11 py-1;
  @apply text-xl font-thin;
  @apply transition;

  &:hover {
    background-color: var(--soku-router-link-hover-c);
  }

  &:active,
  &.router-link-active {
    background-color: var(--soku-router-link-active-c);
  }
}
</style>
