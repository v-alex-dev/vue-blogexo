<template>
  <header class="glass-header w-full py-4 px-8 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-white">BlogExo</h1>
    <nav class="flex items-center">
      <RouterLink to="/" class="mr-4 text-white">Accueil</RouterLink>
      <template v-if="!user">
        <RouterLink to="/login" class="mr-4 text-white">Login</RouterLink>
        <RouterLink to="/register" class="text-white">Inscription</RouterLink>
      </template>
      <template v-else>
        <span class="text-white mr-4">Bonjour, {{ user.username }}</span>
        <button @click="logout" class="btn py-[0.5rem] px-[1rem]">Déconnexion</button>
      </template>
    </nav>
  </header>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)

function logout() {
  userStore.logout()
  window.location.reload()
}

onMounted(() => {
  userStore.loadCurrentUser()
})
</script>
<style scoped></style>
