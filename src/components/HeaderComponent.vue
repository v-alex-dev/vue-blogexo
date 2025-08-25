<!--
  Header Component
  Main navigation header with authentication state and user menu
  Shows different navigation options based on user login status
-->
<template>
  <header class="glass-header w-full py-4 px-8 flex justify-between items-center">
    <!-- Application logo/title -->
    <h1 class="text-2xl font-bold text-white">BlogExo</h1>

    <!-- Navigation menu with conditional content based on auth state -->
    <nav class="flex items-center">
      <!-- Home link always visible -->
      <RouterLink to="/" class="mr-4 text-white">Accueil</RouterLink>

      <!-- Show login/register links when user is not authenticated -->
      <template v-if="!user">
        <RouterLink to="/login" class="mr-4 text-white">Login</RouterLink>
        <RouterLink to="/register" class="text-white">Inscription</RouterLink>
      </template>

      <!-- Show user info and logout when authenticated -->
      <template v-else>
        <span class="text-white mr-4">Bonjour, {{ user.username }}</span>
        <button @click="logout" class="btn py-[0.5rem] px-[1rem]">Déconnexion</button>
      </template>
    </nav>
  </header>
</template>

<script setup>
/**
 * Header component script
 * Manages user authentication state and logout functionality
 */

import { computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)

/**
 * Handle user logout
 * Logs out user and reloads page to reset application state
 */
function logout() {
  userStore.logout()
  window.location.reload()
}

// Load current user data when component mounts
onMounted(() => {
  userStore.loadCurrentUser()
})
</script>
<style scoped></style>
