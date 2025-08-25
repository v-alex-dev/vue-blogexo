<template>
  <div :class="['glass-card', customClass]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: '',
  },
})
</script>
