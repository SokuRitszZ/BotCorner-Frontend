<script setup lang="ts">
import SokuModal from '@/components/SokuComponent/SokuModal/SokuModal.vue';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import SokuSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue';
import useUserStore from '@/store/userStore';
import useTitle from '@/utils/useTitle';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

useTitle('首页 --BotCorner博弈小站');

const userStore = useUserStore();

const isLogin = computed(() => userStore.status === 'logged in');
const name = computed(() => userStore.username);

const testLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    testLoading.value = false;
  }, 3000);
});

const modalRegister = ref();
function toRegister() {
  modalRegister.value!.show();
}
const payloadRegister = ref<{
  username: string;
  password: string;
  confirmed_password: string;
}>({
  username: '',
  password: '',
  confirmed_password: '',
});
const isRegistering = ref(false);
async function submitRegister(e: Event) {
  e.preventDefault();
  try {
    isRegistering.value = true;
    await userStore.register(payloadRegister.value);
    modalRegister.value.hide();
  } finally {
    isRegistering.value = false;
  }
}

const modalLogin = ref();
function toLogin() {
  modalLogin.value!.show();
}
const payloadLogin = ref<{
  username: string;
  password: string;
}>({
  username: '',
  password: '',
});
const isLoging = ref(false);
async function submitLogin(e: Event) {
  e.preventDefault();
  try {
    isLoging.value = true;
    await userStore.getTokenByApi(payloadLogin.value);
    modalLogin.value.hide();
  } finally {
    isLoging.value = false;
  }
}
</script>

<template>
  <SokuModal ref="modalRegister" title="注册BotCorner账号" class="w-[300px]">
    <form @submit="submitRegister" class="form-register">
      <label for="username">用户名</label>
      <input v-model="payloadRegister.username" name="username" type="text" />
      <label for="password">密码</label>
      <input
        v-model="payloadRegister.password"
        name="password"
        type="password"
      />
      <label for="confirmedPassword">确认密码</label>
      <input
        v-model="payloadRegister.confirmed_password"
        name="confirmedPassword"
        type="password"
      />
      <button :disabled="isRegistering" class="submit-btn">
        {{ !isRegistering ? '提交' : '提交中' }}
      </button>
    </form>
  </SokuModal>
  <SokuModal ref="modalLogin" title="登录BotCorner" class="w-[300px]">
    <form @submit="submitLogin" class="form-login">
      <label for="username">用户名</label>
      <input v-model="payloadLogin.username" name="username" type="text" />
      <label for="password">密码</label>
      <input v-model="payloadLogin.password" name="password" type="password" />
      <button :disabled="isLoging" class="submit-btn">
        {{ !isLoging ? '提交' : '提交中' }}
      </button>
    </form>
  </SokuModal>
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
      <SokuImgSkeleton
        class="title-icon"
        url="https://sdfsdf.dev/100x100.png,123123,321321"
      />
      <div class="title">
        <template v-if="!isLogin"> 欢迎来到BotCorner！ </template>
        <template v-else> 你好，{{ name }}! </template>
      </div>
      <div class="options">
        <template v-if="!isLogin">
          <button @click="toRegister" class="option">前往注册</button>
          <button @click="toLogin" class="option">现在登录</button>
        </template>
        <template v-else>
          <button class="option">游戏大厅</button>
          <button class="option">代码管理</button>
        </template>
      </div>
    </div>
    <main class="main">
      <div class="new-record-list">
        <header class="title">公告栏</header>
        <main class="main">
          <SokuSkeleton :is-loading="testLoading">
            <div class="one-announce">
              <h1 class="title">版本 1.0.0 更新公告</h1>
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
