<script setup lang="ts">
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import useBindEvent from '@/hooks/useBindEvent';
import useMatchStore from '@/store/matchStore';
import useUserStore from '@/store/userStore';

const matchStore = useMatchStore();
const userStore = useUserStore();

function exitMatch() {
  matchStore.status = 'to-match';
  matchStore.server!.sendMessage('exit match', {
    id: matchStore.getIndex(userStore.id),
  });
}

useBindEvent('exit match', (data: any) => {
  const index = data.id;

  if (index !== matchStore.getIndex(userStore.id)) {
    window._alert('primary', '对方退出');
    matchStore.status = 'matching';
    matchStore.server!.sendMessage('start match', {
      botId: matchStore.idBotSelected || 0,
    });
  }
});

function ok(index: number) {
  if (matchStore.getIndex(userStore.id) !== index) return;
  matchStore.server!.sendMessage('toggle match', {
    isOk: !matchStore.okPrepare[index],
  });
}

useBindEvent('toggle match', (data: any) => {
  matchStore.okPrepare[data.id] = data.isOk;
});

useBindEvent(['start single game', 'start multi game'], () => {
  matchStore.status = 'to-match';
});
</script>

<template>
  <div class="matched-view">
    <h3>点击以准备/取消准备</h3>
    <button
      @click="ok(idx)"
      class="user"
      :class="[matchStore.okPrepare[idx] ? 'active' : '']"
      v-for="(user, idx) of matchStore.usersMatch"
      :key="user.id"
    >
      <SokuImgSkeleton class="avatar" :url="user.avatar" />
      <div class="username">{{ user.username }}</div>
    </button>
    <button @click="exitMatch" class="btn">退出匹配</button>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
