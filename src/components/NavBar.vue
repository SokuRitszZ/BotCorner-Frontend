<template>  
  <nav class="fixed top-0 leet-0 w-screen min-w-[1600px] py-5 bg-gray-700 z-10">
    <div class="m-auto max-w-7xl px-10 relative">
      <div class="flex justify-between">
        <div class="flex items-center justify-start gap-10 relative">
          <div class="icon">
            <Icon type="botcorner" :size="32" />
          </div>
          <div class="nav_s flex justify-start gap-3 self-start">
            <RouterLink class="transition font-bold text-white py-1 px-3 rounded-lg hover:bg-gray-900 active:900" v-for="url in urls" :to="url.path">{{ url.name }}</RouterLink>
            <a class="transition font-bold text-white py-1 px-3 rounded-lg hover:bg-gray-900 active:900" href="https://www.yuque.com/sokuritszz/upyv68?# 《开放文档》" target="_blank">外链：说明</a>
          </div>
        </div>
        <div>
          <Profile/>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Profile from './Profile.vue';
import Icon from './Icon.vue';

export type IUrl = {
  path: string
  name: string
};
const props = defineProps({
  urls: {
    type: Array<IUrl>,
  },
});
</script>

<style scoped lang="scss">
.router-link-exact-active {
  @apply bg-gray-900;
}
</style>