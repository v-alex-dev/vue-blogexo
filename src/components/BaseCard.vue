<!--
  BaseCard Component
  Reusable card container with glass morphism styling
  Provides consistent layout and appearance for content sections
-->
<template>
  <div :class="['glass-card', customClass]">
    <!-- Content slot for flexible card content -->
    <slot />
  </div>
</template>

<script setup>
// Define props for card customization
defineProps({
  customClass: {
    type: String,
    default: '', // Additional CSS classes for custom styling
  },
})
</script>
