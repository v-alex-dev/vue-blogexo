<script setup>
import HeaderBlog from './components/HeaderComponent.vue'
import FooterBlog from './components/FooterComponent.vue'
import { onMounted } from 'vue'
import './style.css'

onMounted(() => {
  if (!localStorage.getItem('users') || !localStorage.getItem('articles')) {
    fetch('/fakeData.json')
      .then((r) => r.json())
      .then((data) => {
        if (!localStorage.getItem('users'))
          localStorage.setItem('users', JSON.stringify(data.users))
        if (!localStorage.getItem('articles'))
          localStorage.setItem('articles', JSON.stringify(data.articles))
      })
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-dark">
    <HeaderBlog />
    <main class="flex-1">
      <router-view />
    </main>
    <FooterBlog />
  </div>
</template>

<style scoped></style>
