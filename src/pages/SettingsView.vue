<script setup lang="ts">
import { updateAvatarApi } from '@/api/account';
import Cropper from '@/components/CropperVue.vue';
import SokuButton from '@/components/SokuComponent/SokuButton.vue';
import SokuWindow from '@/components/SokuComponent/SokuWindow.vue';
import useUserStore from '@/store/userStore';
import { throttle } from 'lodash';
import { ref } from 'vue';

const userStore = useUserStore();

const $window = ref();
const $cropper = ref();

const updateAvatar = () => {
  $cropper.value.crop();
};

const upload = throttle((data: any) => {
  updateAvatarApi(data)
    .then((data: any) => {
      window._alert('success', '更换头像成功');
      userStore.updateAvatar(data.url);
      $window.value.close();
    })
    .catch((error) => window._alert('danger', error));
}, 3000);

defineExpose({
  open: () => $window.value.open(),
});
</script>

<template>
  <SokuWindow ref="$window" title="个人设置">
    <Cropper
      @crop="upload"
      ref="$cropper"
      class="w-full text-center mt-3"
      :default-src="userStore.avatar"
    />
    <div class="w-full flex justify-center mt-3">
      <soku-button @click="updateAvatar" class="p-2 text-3xl">更换</soku-button>
    </div>
  </SokuWindow>
</template>

<style scoped lang="scss"></style>
