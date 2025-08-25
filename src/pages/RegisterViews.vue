<!--
  Registration Page Component
  Provides user registration form with username, email, and password fields
  Redirects to login page upon successful registration
-->
<template>
  <div class="glass-form max-w-md mx-auto mt-16 p-8 rounded-lg shadow-lg">
    <!-- Page title -->
    <h2 class="text-xl font-bold mb-6 text-white">Inscription</h2>

    <!-- Registration form -->
    <form @submit.prevent="register">
      <!-- Username input field -->
      <div class="mb-4">
        <label class="block text-white mb-2">Nom d'utilisateur</label>
        <input v-model="username" type="text" class="input w-full" required />
      </div>

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
      <BaseButton type="submit">S'inscrire</BaseButton>
    </form>
  </div>
</template>

<script setup>
/**
 * Registration Page Script
 * Handles new user registration and navigation after signup
 */

import BaseButton from '../components/BaseButton.vue'
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

// Form reactive data
const username = ref('')
const email = ref('')
const password = ref('')

// Store and router instances
const userStore = useUserStore()
const router = useRouter()

/**
 * Handle registration form submission
 * Attempts to register new user and redirect to login on success
 */
function register() {
  if (userStore.register(username.value, email.value, password.value)) {
    router.push('/login') // Redirect to login page on successful registration
  } else {
    alert('Email déjà utilisé') // Show error message if email already exists
  }
}
</script>
<style scoped></style>
