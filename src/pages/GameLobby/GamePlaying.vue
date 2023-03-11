<script setup lang="ts">
import SokuSkeleton from "@/components/SokuComponent/SokuSkeleton/SokuSkeleton.vue";
</script>

<template>
  <div class="game-playing">
    <h2 class="title">正在进行</h2>
    <main class="game-grid">
      <SokuSkeleton class="skeleton" :is-loading="false">
        <div class="card">
          <h1 class="font-bold text-3xl text-center pt-4">盘蛇</h1>
          <div class="avatars">
            <img class="avatar" src="https://sdfsdf.dev/100x100.png" alt="" />
            <img class="avatar" src="https://sdfsdf.dev/100x100.png" alt="" />
          </div>
        </div>
      </SokuSkeleton>
      <SokuSkeleton class="skeleton" :is-loading="true"></SokuSkeleton>
      <SokuSkeleton class="skeleton" :is-loading="true"></SokuSkeleton>
      <SokuSkeleton class="skeleton" :is-loading="true"></SokuSkeleton>
      <SokuSkeleton class="skeleton" :is-loading="true"></SokuSkeleton>
      <SokuSkeleton class="skeleton" :is-loading="true"></SokuSkeleton>
    </main>
  </div>
</template>
