<template>
  <div class="glass-form max-w-xl mx-auto mt-16 p-8 rounded-lg shadow-lg">
    <h2 class="text-xl font-bold mb-6 text-white">
      {{ isEdit ? 'Éditer' : 'Ajouter' }} un article
    </h2>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label class="block text-white mb-2">Titre</label>
        <input v-model="title" type="text" class="input w-full" required />
      </div>
      <div class="mb-6">
        <label class="block text-white mb-2">Contenu</label>
        <textarea v-model="content" class="input w-full" rows="6" required></textarea>
      </div>
      <BaseButton type="submit" custom-class="btn">{{
        isEdit ? 'Mettre à jour' : 'Publier'
      }}</BaseButton>
    </form>
  </div>
</template>
<script setup>
import BaseButton from '../components/BaseButton.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const userStore = useUserStore()

const isEdit = computed(() => !!route.params.id)
const title = ref('')
const content = ref('')

onMounted(() => {
  if (isEdit.value) {
    const article = articleStore.getArticleById(route.params.id)
    if (article && userStore.currentUser && article.authorEmail === userStore.currentUser.email) {
      title.value = article.title
      content.value = article.content
    } else {
      router.push('/')
    }
  }
})

function submit() {
  if (!userStore.currentUser) {
    alert('Connectez-vous pour publier')
    return
  }
  if (isEdit.value) {
    articleStore.editArticle(route.params.id, title.value, content.value, userStore.currentUser)
  } else {
    articleStore.addArticle(title.value, content.value, userStore.currentUser)
  }
  router.push('/')
}
</script>
<style scoped></style>
