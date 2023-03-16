<script setup lang="ts">
import useThemeStore from "@/store/themeStore";

const themeStore = useThemeStore();

</script>

<template>
  <div class="settings-favour">
    <div class="-container">
      <h1 class="text-4xl font-bold">外观</h1>
      <hr />
      <h2 class="text-2xl font-thin mt-3">颜色主题</h2>
      <main class="options">
        <div v-for="o in themeStore.themesAvailable" :key="o.class" class="option">
          <input v-model="themeStore.themeCurrent" :value="o.class" name="theme" :id="`theme-${o.class}`" type="radio" >
          <label :for="`theme-${o.class}`">{{ o.title }}</label>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
