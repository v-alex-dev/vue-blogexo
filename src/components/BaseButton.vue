<!--
  BaseButton Component
  Reusable button component with customizable styling and type
  Used throughout the application for consistent button appearance
-->
<template>
  <button :type="type" class="btn" :class="['base-btn', customClass]" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
// Define component props for button customization
defineProps({
  type: {
    type: String,
    default: 'button', // Default button type (button, submit, reset)
  },
  customClass: {
    type: String,
    default: '', // Additional CSS classes for styling
  },
})
</script>

<style scoped></style>
