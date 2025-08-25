<!--
  Login Page Component
  Provides user authentication form with email and password fields
  Redirects to home page upon successful login
-->
<template>
  <div class="glass-form max-w-md mx-auto mt-16 p-8 rounded-lg shadow-lg">
    <!-- Page title -->
    <h2 class="text-xl font-bold mb-6 text-white">Connexion</h2>

    <!-- Login form -->
    <form @submit.prevent="login">
      <!-- Email input field -->
      <div class="mb-4">
        <label class="block text-white mb-2">Email</label>
        <input v-model="email" type="email" class="input w-full" required />
      </div>

      <!-- Password input field -->
      <div class="mb-6">
        <label class="block text-white mb-2">Mot de passe</label>
        <input v-model="password" type="password" class="input w-full" required />
      </div>

      <!-- Submit button -->
      <BaseButton type="submit">Se connecter</BaseButton>
    </form>
  </div>
</template>

<script setup>
/**
 * Login Page Script
 * Handles user authentication and navigation after login
 */

import BaseButton from '../components/BaseButton.vue'
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

// Form reactive data
const email = ref('')
const password = ref('')

// Store and router instances
const userStore = useUserStore()
const router = useRouter()

/**
 * Handle login form submission
 * Attempts to authenticate user and redirect on success
 */
function login() {
  if (userStore.login(email.value, password.value)) {
    router.push('/') // Redirect to home page on successful login
  } else {
    alert('Identifiants invalides') // Show error message for invalid credentials
  }
}
</script>
<style scoped></style>
