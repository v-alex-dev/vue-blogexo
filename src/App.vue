<script setup>
/**
 * Main App component - Root component of the BlogExo application
 * Handles initial data loading from fake JSON and sets up the app layout
 */

import HeaderBlog from './components/HeaderComponent.vue'
import FooterBlog from './components/FooterComponent.vue'
import { onMounted } from 'vue'
import './style.css'

// Initialize fake data on app mount if not already present in localStorage
onMounted(() => {
  if (!localStorage.getItem('users') || !localStorage.getItem('articles')) {
    fetch('/fakeData.json')
      .then((r) => r.json())
      .then((data) => {
        // Seed users data if not present
        if (!localStorage.getItem('users'))
          localStorage.setItem('users', JSON.stringify(data.users))
        // Seed articles data if not present
        if (!localStorage.getItem('articles'))
          localStorage.setItem('articles', JSON.stringify(data.articles))
      })
  }
})
</script>

<template>
  <!-- Main application layout with header, main content, and footer -->
  <div class="min-h-screen flex flex-col bg-dark">
    <!-- Application header with navigation -->
    <HeaderBlog />
    <!-- Main content area where router views are rendered -->
    <main class="flex-1">
      <router-view />
    </main>
    <!-- Application footer -->
    <FooterBlog />
  </div>
</template>

<style scoped></style>
