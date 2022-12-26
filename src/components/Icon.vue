<template>
  <div :class="props.class">
    <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor"
      class="bi bi-check-circle-fill" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>
    <svg v-else-if="type === 'danger'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor"
      class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
    </svg>
    <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor"
      class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
    <svg v-else-if="type === 'primary'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor"
      class="bi bi-circle-fill" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" />
    </svg>
    <svg v-else-if="type === 'plus'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor"
      class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
    </svg>
    <svg v-else-if="type === 'left'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor"
      class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
      <path
        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
    </svg>
    <svg v-else-if="type === 'right'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor" class="bi bi-arrow-right-circle-fill"
      viewBox="0 0 16 16">
      <path
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
    </svg>
    <svg v-else-if="type === 'up'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor" class="bi bi-arrow-up-circle-fill"
      viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
    </svg>
    <svg v-else-if="type === 'down'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16"
      fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
    </svg>
    <svg v-else-if="type === 'play'" xmlns="http://www.w3.org/2000/svg" :width="props.size || 16" :height="props.size || 16" fill="currentColor" class="bi bi-play-circle-fill"
      viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
type PropsType = {
  type: string
  class?: string
  size?: number
}

const props = defineProps<PropsType>();
</script>

<style scoped lang="scss">

</style>