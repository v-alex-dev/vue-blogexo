<template>
  <div class="glass-form max-w-md mx-auto mt-16 p-8 rounded-lg shadow-lg">
    <h2 class="text-xl font-bold mb-6 text-white">Inscription</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label class="block text-white mb-2">Nom d'utilisateur</label>
        <input v-model="username" type="text" class="input w-full" required />
      </div>
      <div class="mb-4">
        <label class="block text-white mb-2">Email</label>
        <input v-model="email" type="email" class="input w-full" required />
      </div>
      <div class="mb-6">
        <label class="block text-white mb-2">Mot de passe</label>
        <input v-model="password" type="password" class="input w-full" required />
      </div>
      <BaseButton type="submit">S'inscrire</BaseButton>
    </form>
  </div>
</template>
<script setup>
import BaseButton from '../components/BaseButton.vue'
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

function register() {
  if (userStore.register(username.value, email.value, password.value)) {
    router.push('/login')
  } else {
    alert('Email déjà utilisé')
  }
}
</script>
<style scoped></style>
