<!--
  Home Page Component
  Displays the main blog homepage with a list of recent articles
  Shows add article button for authenticated users
-->
<template>
  <div class="max-w-3xl mx-auto mt-12">
    <!-- Page header with title and add article button -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-white">Articles récents</h2>
      <!-- Add article button - only visible to authenticated users -->
      <RouterLink v-if="user" to="/add-article" class="btn">Ajouter un article</RouterLink>
    </div>

    <!-- Empty state when no articles exist -->
    <div v-if="articles.length === 0" class="text-white text-center mt-12">
      Aucun article pour le moment.
    </div>

    <!-- Article list -->
    <BaseCard
      v-for="article in articles"
      :key="article.id"
      :customClass="'mb-6 p-6 rounded-lg shadow-lg flex flex-col justify-between relative'"
      style="min-height: 12rem"
    >
      <!-- Article content -->
      <div>
        <h3 class="text-xl font-semibold text-white mb-2">{{ article.title }}</h3>
        <p class="text-white mb-4">{{ article.content.substring(0, 120) }}...</p>
      </div>

      <!-- Article actions -->
      <div class="flex justify-between items-end mt-auto">
        <RouterLink :to="`/article/${article.id}`" class="btn">Lire la suite</RouterLink>
      </div>

      <!-- Comment count indicator -->
      <div class="absolute bottom-4 right-6 flex items-center text-sm text-gray-300 gap-1">
        <!-- Comment icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 21h9m-9 0a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 017.5 4.5h9a2.25 2.25 0 012.25 2.25v12A2.25 2.25 0 0116.5 21m-9 0v.75A2.25 2.25 0 009.75 24h4.5A2.25 2.25 0 0016.5 21.75V21"
          />
        </svg>
        <!-- Comment count text -->
        <span>
          {{ getCommentCount(article.id) }} commentaire<span v-if="getCommentCount(article.id) > 1"
            >s</span
          >
        </span>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
/**
 * Home Page Script
 * Manages article list display and comment count functionality
 */

import { onMounted, computed } from 'vue'
import { useArticleStore } from '../stores/article'
import { useUserStore } from '../stores/user'
import { useCommentStore } from '../stores/comment'
import { storeToRefs } from 'pinia'
import BaseCard from '../components/BaseCard.vue'

// Store instances and reactive state
const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)

const commentStore = useCommentStore()

/**
 * Get the number of comments for a specific article
 * @param {string} articleId - The article ID
 * @returns {number} - Number of comments
 */
function getCommentCount(articleId) {
  return commentStore.getCommentsByArticleId(articleId).length
}

// Load all necessary data when component mounts
onMounted(() => {
  articleStore.loadArticles()
  userStore.loadCurrentUser()
  commentStore.loadComments()
})
</script>
<style scoped></style>
