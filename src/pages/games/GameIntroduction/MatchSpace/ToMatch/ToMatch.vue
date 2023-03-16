<script setup lang="ts">
import useCacheStore from '@/store/cacheStore';
import useMatchStore from '@/store/matchStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const bots = ref<{
  id: number;
  title: string;
}[]>([{
  id: 0,
  title: '亲自出马',
}]);
const cacheStore = useCacheStore();
const route = useRoute();

const idGame = +route.meta.id!;

onMounted(async () => {
  try {
    let botsGot: any[] = await cacheStore.getBots;
    botsGot = botsGot.filter(b => b.gameId === idGame).map(b => ({
      id: b.id,
      title: b.title,
    }));
    bots.value.push(...botsGot);
  }
  catch(e) {
    window._alert('danger', e as string);
  }
});

const matchStore = useMatchStore();

async function startGame() {
  matchStore.status = 'game-starting';
  matchStore.server!.sendMessage('start single game', {
    botIds: matchStore.idsBot.map((x) => x || 0),
  });
}

function startMatch() {
  matchStore.status = 'matching';
  matchStore.server!.sendMessage('start match', {
    botId: matchStore.idBotSelected || 0,
  });
  // 在 matching 页面必须写一个确认机制
}
</script>
<template>
  <div class="to-match">
    <h1 class="text-3xl font-thin">单人模式</h1>
    <hr />
    <main>
      <input
        v-model="matchStore.idsBot[idx]"
        v-for="(i, idx) in matchStore.idsBot"
        :key="idx"
        type="number"
        :placeholder="`${idx + 1}号BotID（0代表手动）`"
      />
      <button
        v-if="matchStore.idsBot.length > 1"
        @click="matchStore.minusIdBot"
        class="btn"
      >
        -
      </button>
      <button
        v-if="matchStore.idsBot.length < 4"
        @click="matchStore.addIdBot"
        class="btn"
      >
        +
      </button>
      <button @click="startGame" class="btn">开始游戏</button>
    </main>
    <h1 class="text-3xl font-thin mt-4">多人模式</h1>
    <hr />
    <main>
      <select
        v-model="matchStore.idBotSelected"
        name="idSelected"
        id="idSelected"
      >
        <option class="font-thin" v-for="bot in bots" :key="bot.id" :value="bot.id">
          {{ bot.title }} #{{ bot.id }}
        </option>
      </select>
      <button @click="startMatch" class="btn">开始匹配</button>
    </main>
  </div>
</template>
<style scoped lang="scss">
@import url('./style.scss');
</style>
