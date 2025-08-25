import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/HomeViews.vue'
import Login from '../pages/LoginViews.vue'
import Register from '../pages/RegisterViews.vue'
import Article from '../pages/ArticleViews.vue'
import AddEditArticle from '../pages/AddEditArticle.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/article/:id', component: Article },
  { path: '/add-article', component: AddEditArticle },
  { path: '/edit-article/:id', component: AddEditArticle },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
