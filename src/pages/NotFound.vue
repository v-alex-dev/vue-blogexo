<!--
  404 Not Found Page Component
  Displays a styled error page when users navigate to non-existent routes
-->
<template>
  <div class="max-w-2xl mx-auto mt-24 text-center">
    <!-- 404 Error Card -->
    <BaseCard :customClass="'p-12 rounded-xl shadow-xl'">
      <!-- Large 404 number -->
      <div class="text-8xl font-bold text-blue-500 mb-4">404</div>

      <!-- Error message -->
      <h1 class="text-3xl font-bold text-white mb-4">Page non trouvée</h1>
      <p class="text-white/80 text-lg mb-8">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      <!-- Error illustration -->
      <div class="mb-8">
        <svg
          class="w-32 h-32 mx-auto text-blue-400/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-8v8m-6 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <!-- Navigation buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <!-- Go back button -->
        <button @click="goBack" class="btn bg-gray-600 hover:bg-gray-700 text-white">
          ← Retour
        </button>

        <!-- Home button -->
        <RouterLink to="/" class="btn bg-blue-600 hover:bg-blue-700 text-white">
          🏠 Accueil
        </RouterLink>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
/**
 * 404 Not Found Page Script
 * Handles navigation back to previous page or home
 */

import { useRouter } from 'vue-router'
import BaseCard from '../components/BaseCard.vue'

const router = useRouter()

/**
 * Navigate back to the previous page or home if no history
 */
function goBack() {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
/* Additional custom styles for 404 page if needed */
</style>
