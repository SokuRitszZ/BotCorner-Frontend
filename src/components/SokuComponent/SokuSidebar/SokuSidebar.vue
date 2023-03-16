<script setup lang="ts">
</script>

<template>
  <div class="--soku-sidebar">
    <header class="header">
      <slot name="header"></slot>
    </header>

    <main class="main">
      <slot name="main"></slot>
    </main>

    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style lang="scss">
@import url("./style.scss");
</style>