<template>
  <div class="max-w-3xl mx-auto mt-12">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-white">Articles récents</h2>
      <RouterLink v-if="user" to="/add-article" class="btn">Ajouter un article</RouterLink>
    </div>
    <div v-if="articles.length === 0" class="text-white text-center mt-12">
      Aucun article pour le moment.
    </div>
    <BaseCard
      v-for="article in articles"
      :key="article.id"
      :customClass="'mb-6 p-6 rounded-lg shadow-lg flex flex-col justify-between relative'"
      style="min-height: 12rem"
    >
      <div>
        <h3 class="text-xl font-semibold text-white mb-2">{{ article.title }}</h3>
        <p class="text-white mb-4">{{ article.content.substring(0, 120) }}...</p>
      </div>
      <div class="flex justify-between items-end mt-auto">
        <RouterLink :to="`/article/${article.id}`" class="btn">Lire la suite</RouterLink>
      </div>
      <div class="absolute bottom-4 right-6 flex items-center text-sm text-gray-300 gap-1">
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
import { onMounted, computed } from 'vue'
import { useArticleStore } from '../stores/article'
import { useUserStore } from '../stores/user'
import { useCommentStore } from '../stores/comment'
import { storeToRefs } from 'pinia'
import BaseCard from '../components/BaseCard.vue'

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)

const commentStore = useCommentStore()

function getCommentCount(articleId) {
  return commentStore.getCommentsByArticleId(articleId).length
}

onMounted(() => {
  articleStore.loadArticles()
  userStore.loadCurrentUser()
  commentStore.loadComments()
})
</script>
<style scoped></style>
