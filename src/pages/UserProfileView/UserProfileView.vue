<script setup lang="ts">
import useTitle from '@/utils/useTitle';
import { faker } from '@faker-js/faker';

useTitle('个人主页 --BotCorner博弈小站');

type INav = {
  title: string;
  url: string;
};
const itemNav: INav[] = [
  {title: '自制程序', url: '#'}, 
  {title: '发表看法', url: '#'}, 
  {title: '获得奖项', url: '#'}, 
];
</script>

<template>
  <div class="user-profile w-full h-full">
    <div class="-container">
      <header class="header">
        <img
          class="background"
          src="https://sdfsdf.dev/100x100.png"
          alt="background-img"
        />
      </header>
      <div class="profiles">
        <div class="profiles-container">
          <img
            class="avatar"
            src="https://sdfsdf.dev/100x100.png"
            alt="avatar"
          />
          <div class="sign">
            <div class="name">{{ faker.name.fullName() }}</div>
            <div class="signature">{{ faker.lorem.sentence() }}</div>
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
        nav-view
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
