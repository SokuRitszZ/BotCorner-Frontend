<script setup lang="ts">
type PropsType = {
  to: string;
};
const props = defineProps<PropsType>();
</script>

<template>
  <router-link :to="props.to" class="item">
    <slot></slot>
  </router-link>
</template>

<style scoped lang="scss"></style>