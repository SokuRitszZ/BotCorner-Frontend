<template>
  <div class="lg:normal h-screen w-screen bg-purple-500 overflow-auto flex flex-col justify-start">
    <div class="text-center mb-10 relative mx-auto mt-24">
      <div class="w-fit flex items-center">
        <input placeholder="此功能未开放" type="text" class="w-96 h-10 rounded-lg shadow-xl hover:shadow-2xl p-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="60%" fill="currentColor"
          class="bi bi-search absolute z-10 top-2 right-2 items-center text-purple-800 cursor-pointer" viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
    </div>
    <!-- card container -->
    <div class="flex flex-col justify-start">
      <div v-for="game in games" class="w-96 h-[120px] text-2xl mt-4 p-4 bg-gray-100 rounded-3xl m-auto shadow-2xl shrink-0 hover:translate-x-3 cursor-pointer transition select-none">
        <h1 class="font-semibold text-purple-500">{{game.title}}</h1>
        <div class="h-14 overflow-scroll">
          <p>{{game.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

export type IGame = {
  name: string 
  title: string 
  description: string
};

const games: IGame[] = [
  {
    name: "snake",
    title: "盘蛇",
    description: "Accusantium neque consequatur est impedit aspernatur amet sed in sunt. Natus quod dolorum officiis adipisci impedit sequi quibusdam. A vel aut qui necessitatibus omnis distinctio voluptas consequuntur. Repellat dolore nobis quaerat molestias repellendus eum. Placeat odio dicta ducimus ab dolores ea cumque. Aliquam voluptas quasi qui nam."
  },
  {
    name: "reversi",
    title: "黑白棋",
    description: "Quas corrupti asperiores ullam et. In laudantium nemo earum ea officia cupiditate. Sit omnis culpa. Porro rem nisi omnis hic."
  },
  {
    name: "backgammon",
    title: "西洋双陆棋",
    description: "Deserunt voluptas eos rerum. Nemo necessitatibus aut. Sit a qui aut ducimus expedita est."
  }
];
</script>

<style scoped lang="scss">
.normal {
  @apply 
  w-screen h-screen;
}
</style>