<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import RouteSidebar from './components/RouteSidebar.vue';
import Alert from './components/SokuComponent/SokuAlert.vue';
import useGameRoute from './hooks/useGameRoute';
import useUserStore from './store/userStore';

const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  try {
    await userStore.getInfo();
    await useGameRoute(router);
  } catch (e) {
    window._alert('danger', '登录失败，请重试');
  }
});
</script>

<template>
  <Alert />
  <div class="flex">
    <RouteSidebar />
    <div class="main-view relative">
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive :include="['RecordList', 'RatingView']">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-view {
  width: calc(100vw - 250px);
  min-width: 680px;
  height: 100vh;
  overflow: scroll;

  & > div {
    position: absolute;
    left: 0;
    top: 0;
  }
}

.v-enter-active {
  animation: 1s enter;
}

.v-leave-active {
  animation: 1s leave;
}
@keyframes enter {
  0%,
  50% {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes leave {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  50%,
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
