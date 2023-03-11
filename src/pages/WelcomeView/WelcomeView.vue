<script setup lang="ts">
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import useUserStore from '@/store/userStore';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';


const userStore = useUserStore();

const isLogin = computed(() => userStore.status === 'logged in');
const name = computed(() => userStore.username);

const testLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    testLoading.value = false;
  }, 3000);
});
</script>

<template>
  <div class="welcome-view w-full h-full">
    <header class="announce">
      <div class="title">公告</div>
      <div class="detail">
        <div class="-container">
          {{ faker.lorem.sentence(50) }}
        </div>
      </div>
    </header>
    <div class="welcome-board">
      <img src="https://sdfsdf.dev/100x100.png,123123,321321" alt="" />
      <div class="title">
        <template v-if="!isLogin"> 欢迎来到BotCorner！ </template>
        <template v-else> 你好，{{ name }} </template>
      </div>
      <div class="options">
        <template v-if="!isLogin">
          <button class="option">前往注册</button>
          <button class="option">现在登录</button>
        </template>
        <template v-else>
          <button class="option">游戏大厅</button>
          <button class="option">代码管理</button>
        </template>
      </div>
    </div>
    <main class="main">
      <div class="new-record-list">
        <header class="title">最近比赛</header>
        <main class="main">
          <SokuSkeleton :is-loading="testLoading">
            <div class="record-card">
              <h1 class="font-bold text-3xl text-center pt-4">盘蛇</h1>
              <div class="avatars">
                <img
                  class="avatar"
                  src="https://sdfsdf.dev/100x100.png"
                  alt=""
                />
                <img
                  class="avatar"
                  src="https://sdfsdf.dev/100x100.png"
                  alt=""
                />
              </div>
              <div class="time">
                {{ dayjs().format('YYYY-MM-DD hh:mm:ss') }}
              </div>
            </div>
          </SokuSkeleton>
          <SokuSkeleton :is-loading="true"></SokuSkeleton>
          <SokuSkeleton :is-loading="true"></SokuSkeleton>
          <SokuSkeleton :is-loading="true"></SokuSkeleton>
        </main>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
