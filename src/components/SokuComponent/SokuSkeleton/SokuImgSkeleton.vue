<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import SokuSkeleton from './SokuSkeleton.vue';

type PropsType = {
  class?: string | string[];
  url: string;
};
const props = defineProps<PropsType>();

const isLoading = ref(true);
const domImg = ref<HTMLImageElement>();

watch(() => props.url, () => {
  isLoading.value = true;
});

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