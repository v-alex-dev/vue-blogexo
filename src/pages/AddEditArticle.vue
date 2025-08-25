<!--
  Add/Edit Article Page Component
  Provides form for creating new articles or editing existing ones
  Mode is determined by presence of article ID in route parameters
-->
<template>
  <div class="glass-form max-w-xl mx-auto mt-16 p-8 rounded-lg shadow-lg">
    <!-- Dynamic page title based on mode -->
    <h2 class="text-xl font-bold mb-6 text-white">
      {{ isEdit ? 'Éditer' : 'Ajouter' }} un article
    </h2>

    <!-- Article form -->
    <form @submit.prevent="submit">
      <!-- Article title input -->
      <div class="mb-4">
        <label class="block text-white mb-2">Titre</label>
        <input v-model="title" type="text" class="input w-full" required />
      </div>

      <!-- Article content textarea -->
      <div class="mb-6">
        <label class="block text-white mb-2">Contenu</label>
        <textarea v-model="content" class="input w-full" rows="6" required></textarea>
      </div>

      <!-- Submit button with dynamic text -->
      <BaseButton type="submit" custom-class="btn">{{
        isEdit ? 'Mettre à jour' : 'Publier'
      }}</BaseButton>
    </form>
  </div>
</template>

<script setup>
/**
 * Add/Edit Article Page Script
 * Handles both article creation and editing functionality
 */

import BaseButton from '../components/BaseButton.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article'
import { useUserStore } from '../stores/user'

// Router and store instances
const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const userStore = useUserStore()

// Determine if we're in edit mode based on route parameter
const isEdit = computed(() => !!route.params.id)

// Form reactive data
const title = ref('')
const content = ref('')

// Load article data when in edit mode
onMounted(() => {
  if (isEdit.value) {
    const article = articleStore.getArticleById(route.params.id)
    // Verify user is the author before allowing edit
    if (article && userStore.currentUser && article.authorEmail === userStore.currentUser.email) {
      title.value = article.title
      content.value = article.content
    } else {
      // Redirect to home if user is not authorized to edit
      router.push('/')
    }
  }
})

/**
 * Handle form submission for both add and edit modes
 * Validates user authentication and performs appropriate action
 */
function submit() {
  if (!userStore.currentUser) {
    alert('Connectez-vous pour publier')
    return
  }

  if (isEdit.value) {
    // Update existing article
    articleStore.editArticle(route.params.id, title.value, content.value, userStore.currentUser)
  } else {
    // Create new article
    articleStore.addArticle(title.value, content.value, userStore.currentUser)
  }

  // Redirect to home page after successful submission
  router.push('/')
}
</script>
<style scoped></style>
