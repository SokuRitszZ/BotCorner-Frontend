<script setup lang="ts">
import { getInfoByIdApi } from '@/api/account';
import SokuImgSkeleton from '@/components/SokuComponent/SokuSkeleton/SokuImgSkeleton.vue';
import { IUser } from '@/store/userStore';
import useTitle from '@/utils/useTitle';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

useTitle('用户主页 --BotCorner博弈小站');

const route = useRoute();
const id = +route.params.id;

type INav = {
  title: string;
  url: string;
};

const itemNav: INav[] = [
  { title: '自制程序', url: `/user/other/${id}/bots` },
  { title: '发表看法', url: `/user/other/${id}/comments` },
  { title: '获得奖项', url: `/user/other/${id}/prize` },
];

const info = ref<IUser>({
  id: 0,
  username: '获取中',
  signature: '获取中',
  avatar: 'https://sdfsdf.dev/100x100.png',
});

onMounted(async () => {
  try {
    const result = ((await getInfoByIdApi(id)) as any).result;
    if (!result) {
      throw Error();
    }
    info.value = result;
  } catch (e) {
    window._alert('danger', '获取失败，可能不存在此用户');
    info.value = {
      id: 0,
      username: '未知',
      signature: '啊吧啊吧······',
      avatar: 'https://sdfsdf.dev/100x100.png',
    };
  }
});
</script>

<template>
  <div class="user-profile w-full h-full">
    <div class="-container">
      <header class="header">
        <SokuImgSkeleton
          class="background"
          :url="info.avatar"
          alt="background-img"
        />
      </header>
      <div class="profiles">
        <div class="profiles-container">
          <SokuImgSkeleton class="avatar" :url="info.avatar" alt="avatar" />
          <div class="sign">
            <div class="name">{{ info.username }}</div>
            <div class="signature">
              {{ info.signature || '这个人很懒，什么都没留下。' }}
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <ul>
          <li v-for="it in itemNav" :key="it.title">
            <router-link :to="it.url">{{ it.title }}</router-link>
          </li>
        </ul>
      </nav>
      <div class="nav-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
