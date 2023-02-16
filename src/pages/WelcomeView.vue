<script setup lang="ts"></script>

<template>
  <div class="welcome-container">
    <!-- content -->
    <div class="lg:grid lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 h-screen">
      <!-- title -->
      <div
        class="text-gray-200 text-6xl min-h-[500px] lg:text-8xl m-auto text-center bg-purple-500 w-full h-full flex flex-col justify-center"
      >
        <div>
          <p class="m-auto font-semibold">
            <span> Bot </span>
            Corner
          </p>
          <p class="m-auto font-semibold">
            <span> 博弈 </span>
            小站
          </p>
        </div>
      </div>
      <!-- shoukai -->
      <div class="pt-24 ml-10 overflow-auto pb-24">
        <p class="mt-5 text-7xl font-semibold">Bot Corner 是什么</p>
        <div class="mt-10 normal px-5 text-3xl">
          <p>这是一个</p>
          <p>
            <span class="text-purple-600 font-semibold"
              >仿北京大学Botzone棋盘游戏博弈平台</span
            >
          </p>
          <p>你可以从众多的游戏中挑选任一</p>
          <p>与其他玩家进行实力比拼</p>
          <p>
            这里的实力不仅仅是
            <span> 策略能力 </span>
          </p>
          <p>
            也可以代表
            <span> 博弈程序优异性 </span>
          </p>
          <p>
            可以 <span>亲自出马</span>，亦可以 <span>编写博弈程序代你出马</span>
          </p>
        </div>
        <p class="mt-10 text-7xl font-semibold">Bot Corner 由来</p>
        <div class="px-5 normal">
          <p class="mt-10">
            2022年3月，作者正修《数据结构实验课》，课设要求是编写博弈程序，藉此了解到博弈程序平台
            <span>北京大学Botzone</span>。
          </p>
          <p class="mt-2">
            虽然当时没有加入到一起编写博弈程序的“大流“中，现在回想起来略感可惜。
            但看到
            <span>北京大学Botzone</span>
            ，加之我之前曾有自己
            <span>开发一个OJ</span>
            的想法，大胆的想法就此开始，便有了今天此平台
          </p>
          <p>
            <span class="text-6xl">Bot Corner</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.welcome-container {
  scrollbar-width: none;
  @apply w-full h-fit
  relative;
}

.welcome-container::-webkit-scrollbar {
  display: none;
}

p {
  .normal & {
    @apply text-3xl;
  }
  span {
    @apply text-purple-700 font-semibold;
  }
}
</style>
