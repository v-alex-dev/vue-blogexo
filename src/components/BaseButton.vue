<template>
  <button :type="type" class="btn" :class="['base-btn', customClass]" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  customClass: {
    type: String,
    default: '',
  },
})
</script>

<style scoped></style>
