<template>
  <div class="glass-form max-w-md mx-auto mt-16 p-8 rounded-lg shadow-lg">
    <h2 class="text-xl font-bold mb-6 text-white">Connexion</h2>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label class="block text-white mb-2">Email</label>
        <input v-model="email" type="email" class="input w-full" required />
      </div>
      <div class="mb-6">
        <label class="block text-white mb-2">Mot de passe</label>
        <input v-model="password" type="password" class="input w-full" required />
      </div>
      <BaseButton type="submit">Se connecter</BaseButton>
    </form>
  </div>
</template>
<script setup>
import BaseButton from '../components/BaseButton.vue'
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

function login() {
  if (userStore.login(email.value, password.value)) {
    router.push('/')
  } else {
    alert('Identifiants invalides')
  }
}
</script>
<style scoped></style>
