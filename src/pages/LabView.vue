<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Progress from '@/components/SokuComponent/SokuProgress.vue';
import Window from '@/components/SokuComponent/SokuWindow.vue';
import ChatRoom from '@/components/ChatRoom.vue';
import Icon from '@/components/BootstrapIcon.vue';

const val = ref<number>(0);
const $window = ref();

onMounted(() => {
  if ($window.value) {
    $window.value.open();
  }
});
</script>

<template>
  <div class="mt-24 h-full text-center">
    <Progress v-model="val" :max="200" :width="100" />
    <Window ref="$window"></Window>
    <ChatRoom />
    <div class="w-40 h-40 bg-purple-400" />
    <Icon type="botcorner" :size="240" />
    <svg width="32" height="32" viewBox="0 0 8 8">
      <circle cx="2" cy="2" r="2" fill="#c33"></circle>
      <circle cx="6" cy="2" r="2" fill="#33c"></circle>
      <circle cx="4" cy="5.5" r="2" fill="#3c3"></circle>
    </svg>
  </div>
</template>

<style scoped lang="scss"></style>
