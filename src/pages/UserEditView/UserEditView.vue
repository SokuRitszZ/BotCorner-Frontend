<script setup lang="ts">
</script>

<template>
  <div class="user-profile w-full h-full">
    <div class="-container">
      <label for="change-avatar">
        <img class="avatar" src="https://sdfsdf.dev/100x100.png" alt="" />
      </label>
      <input id="change-avatar" class="hidden" type="file" />
      <form>
        <label for="username">昵称</label>
        <input id="username" type="text" />
        <label for="signature">个性签名</label>
        <input id="signature" type="text" />
      </form>
      <button class="submit-btn">保存</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');
</style>
