<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SokuSkeleton from './SokuSkeleton.vue';

type PropsType = {
  class?: string | string[];
  url: string;
};
const props = defineProps<PropsType>();

const isLoading = ref(true);
const domImg = ref<HTMLImageElement>();
onMounted(() => {
  domImg.value!.addEventListener('load', () => {
    isLoading.value = false;
  });
})
</script>

<template>
  <SokuSkeleton :class="props.class" :is-loading="isLoading">
    <img ref="domImg" class="w-full h-full" :src="props.url" alt="">
  </SokuSkeleton>
</template>