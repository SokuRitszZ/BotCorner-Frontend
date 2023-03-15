<script setup lang="ts">
import { updateAvatarApi, updateProfileApi } from '@/api/account';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useUserStore from '@/store/userStore';
import useTitle from '@/utils/useTitle';
import { computed, nextTick, ref } from 'vue';

useTitle('修改资料 --BotCorner博弈小站');

async function saveEdition() {
  let { username, password, signature } = settingsNew.value;
  try {
    const payload: any = {};
    if ((username = username.trim()) !== userStore.username) payload.username = username;
    if ((password = password.trim())) payload.password = password;
    if ((signature = signature.trim()) !== userStore.signature) payload.signature = signature;
    if (Object.keys(payload).length) {
      await updateProfileApi(payload) as any;
      userStore.$patch({
        username,
        signature,
      });
    }
    if (file.value) {
      const res2 = await updateAvatarApi(file.value) as any;
      userStore.avatar = '';
      await nextTick();
      userStore.avatar = res2.url;
    }
    window._alert('success', '更新成功');
  } catch (e) {
    window._alert('danger', e as any);
  }
}

const userStore = useUserStore();

const settingsNew = ref<{
  username: string;
  signature: string;
  password: string;
  avatar: string;
}>({
  username: userStore.username,
  signature: userStore.signature,
  password: '',
  avatar: userStore.avatar,
});

const domInput = ref<HTMLInputElement>();
const file = ref<File>();

function changeFile() {
  if (!domInput.value!.files) return;
  file.value = domInput.value!.files[0];
  if (!/image\/.*/.test(file.value.type)) return;
  const url = URL.createObjectURL(file.value);
  settingsNew.value.avatar = url;
}

const isSame = computed(() => {
  return (
    settingsNew.value.username.trim() === userStore.username &&
    settingsNew.value.signature.trim() === userStore.signature && 
    !settingsNew.value.password &&
    !file.value
  );
});
</script>

<template>
  <div class="user-profile w-full h-full">
    <div class="-container">
      <label for="change-avatar">
        <SokuImgSkeleton class="avatar" :url="settingsNew.avatar" />
      </label>
      <input
        ref="domInput"
        @change="changeFile"
        id="change-avatar"
        class="hidden"
        type="file"
      />
      <form>
        <label for="username">昵称</label>
        <input id="username" type="text" v-model="settingsNew.username" />
        <label for="signature">个性签名</label>
        <input id="signature" type="text" v-model="settingsNew.signature" />
        <label for="password">密码</label>
        <input id="password" type="password" v-model="settingsNew.password" />
      </form>
      <button :disabled="isSame" @click="saveEdition" class="submit-btn">
        保存
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
