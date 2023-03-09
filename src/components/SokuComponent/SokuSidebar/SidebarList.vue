<script setup lang="ts">
type PropsType = {
  title: string;
};
const props = defineProps<PropsType>();
</script>

<template>
  <div class="list">
    <h2 class="title">
      {{ props.title }}
    </h2>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>