<template>
  <div :class="props.class">
    <svg
      v-if="type === 'success'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-check-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
      />
    </svg>
    <svg
      v-else-if="type === 'danger'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-x-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
      />
    </svg>
    <svg
      v-else-if="type === 'warning'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-exclamation-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
      />
    </svg>
    <svg
      v-else-if="type === 'primary'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-circle-fill"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="8" />
    </svg>
    <svg
      v-else-if="type === 'plus'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-plus-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
      />
    </svg>
    <svg
      v-else-if="type === 'left'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-arrow-left-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
      />
    </svg>
    <svg
      v-else-if="type === 'right'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-arrow-right-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
      />
    </svg>
    <svg
      v-else-if="type === 'up'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-arrow-up-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
      />
    </svg>
    <svg
      v-else-if="type === 'down'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-arrow-down-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
      />
    </svg>
    <svg
      v-else-if="type === 'play'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-play-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
      />
    </svg>
    <svg
      v-else-if="type === 'pause'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-pause-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"
      />
    </svg>
    <svg
      v-else-if="type === 'skip'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-skip-forward-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z"
      />
    </svg>
    <svg
      v-else-if="type === 'skip-rev'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-skip-backward-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"
      />
    </svg>
    <svg
      v-else-if="type === 'eye'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-eye-fill"
      viewBox="0 0 16 16"
    >
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path
        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
      />
    </svg>
    <svg
      v-else-if="type === 'eye-slash'"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 16"
      :height="props.size || 16"
      fill="currentColor"
      class="bi bi-eye-slash-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
      />
      <path
        d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
      />
    </svg>
    <svg
      v-else-if="type === 'bot'"
      :width="props.size || 16"
      :height="props.size || 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="bi bi-robot inline top-0 relative -translate-y-1"
      viewBox="0 0 16 16"
    >
      <path
        d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"
      />
      <path
        d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"
      />
    </svg>
    <svg
      v-else-if="type === 'controller'"
      :width="props.size || 16"
      :height="props.size || 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      class="bi bi-controller inline"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"
      />
      <path
        d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"
      />
    </svg>
    <svg
      v-else-if="type === 'botcorner'"
      :width="`${props.size || 16}px`"
      :height="`${props.size || 16}px`"
      viewBox="0 0 8 8"
    >
      <circle cx="2" cy="2" r="2" fill="#c33" />
      <circle cx="6" cy="2" r="2" fill="#33c" />
      <circle cx="4" cy="5.5" r="2" fill="#3c3" />
    </svg>
    <svg
      v-else-if="type === 'dash'"
      xmlns="http://www.w3.org/2000/svg"
      :width="`${props.size || 16}px`"
      :height="`${props.size || 16}px`"
      fill="currentColor"
      class="bi bi-dash-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
type PropsType = {
  type: string;
  class?: any;
  size?: number;
};

const props = defineProps<PropsType>();
</script>

<style scoped lang="scss"></style>
