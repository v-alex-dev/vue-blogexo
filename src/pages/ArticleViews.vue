<template>
  <div v-if="article" class="max-w-4xl mx-auto mt-12">
    <h2 class="text-3xl font-bold text-white text-center mb-10">{{ article.title }}</h2>
    <div class="flex flex-col md:flex-row gap-8">
      <BaseCard customClass="flex-1 p-8 rounded-lg shadow-lg">
        <p class="text-white text-lg mb-4">{{ article.content }}</p>
        <div v-if="canEdit" class="mb-4">
          <RouterLink :to="`/edit-article/${article.id}`" class="btn">Éditer l'article</RouterLink>
        </div>
      </BaseCard>
      <BaseCard
        customClass="w-full md:w-64 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
      >
        <h3 class="text-gray-300 text-sm mb-2">Auteur</h3>
        <p class="text-white text-lg font-semibold">{{ article.author }}</p>
        <p class="text-gray-400 text-sm">{{ article.create_at }}</p>
      </BaseCard>
    </div>
    <div class="mt-10">
      <BaseCard customClass="p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold text-white mb-4">Commentaires</h3>
        <div v-if="comments.length === 0" class="text-gray-400 mb-4">
          Aucun commentaire pour cet article.
        </div>
        <div v-for="comment in comments" :key="comment.id" class="glass-comment mb-2 p-4 rounded">
          <div class="flex justify-between items-center">
            <span class="text-white font-semibold">{{ comment.author }}</span>
            <div v-if="user && user.email === comment.authorEmail">
              <button @click="openEditModal(comment)" class="text-xs text-blue-400 mr-2">
                Éditer
              </button>
              <button @click="deleteComment(comment.id)" class="text-xs text-red-400">
                Supprimer
              </button>
            </div>
          </div>
          <p class="text-white mt-2">{{ comment.content }}</p>
        </div>
        <EditCommentModal
          v-if="showEditModal"
          v-model="showEditModal"
          :comment="selectedComment"
          @save="handleEditComment"
        />
        <form @submit.prevent="addComment" class="mt-6">
          <textarea
            v-model="newComment"
            class="input w-full mb-2"
            rows="2"
            placeholder="Ajouter un commentaire..."
          ></textarea>
          <BaseButton type="submit">Commenter</BaseButton>
        </form>
      </BaseCard>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'
import BaseCard from '../components/BaseCard.vue'
import EditCommentModal from '../components/EditCommentModal.vue'
import { useArticleStore } from '../stores/article'
import { useUserStore } from '../stores/user'
import { useCommentStore } from '../stores/comment'

const route = useRoute()
const articleStore = useArticleStore()
const userStore = useUserStore()
const commentStore = useCommentStore()

const articleId = route.params.id
const article = computed(() => articleStore.getArticleById(articleId))
const user = computed(() => userStore.currentUser)
const comments = computed(() => commentStore.getCommentsByArticleId(articleId))
const canEdit = computed(
  () => user.value && article.value && user.value.email === article.value.authorEmail,
)

const newComment = ref('')
const showEditModal = ref(false)
const selectedComment = ref(null)

function openEditModal(comment) {
  selectedComment.value = { ...comment }
  showEditModal.value = true
}

function handleEditComment(newContent) {
  if (selectedComment.value && newContent) {
    commentStore.editComment(selectedComment.value.id, newContent, user.value)
  }
}

function addComment() {
  if (!user.value) {
    alert('Connectez-vous pour commenter')
    return
  }
  commentStore.addComment(articleId, newComment.value, user.value)
  newComment.value = ''
}
function deleteComment(commentId) {
  commentStore.deleteComment(articleId, commentId, user.value)
}
</script>
<style scoped></style>
