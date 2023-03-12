<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useUserStore from '@/store/userStore';
import useTitle from '@/utils/useTitle';

useTitle('修改资料 --BotCorner博弈小站');

function saveEdition() {
  window._alert('primary', '敬请期待');
}

const userStore = useUserStore();
</script>

<template>
  <div class="user-profile w-full h-full">
    <div class="-container">
      <label for="change-avatar">
        <SokuImgSkeleton class="avatar" :url="userStore.avatar" alt="" />
      </label>
      <input id="change-avatar" class="hidden" type="file" />
      <form>
        <label for="username">昵称</label>
        <input id="username" type="text" />
        <label for="signature">个性签名</label>
        <input id="signature" type="text" />
      </form>
      <button @click="saveEdition" class="submit-btn">保存</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
