/**
 * Vue Router configuration for the BlogExo application
 * Defines all application routes and their corresponding components
 */

import { createRouter, createWebHistory } from 'vue-router'

// Import page components
import Home from '../pages/HomeViews.vue'
import Login from '../pages/LoginViews.vue'
import Register from '../pages/RegisterViews.vue'
import Article from '../pages/ArticleViews.vue'
import AddEditArticle from '../pages/AddEditArticle.vue'
import NotFound from '../pages/NotFound.vue'

// Define application routes
const routes = [
  { path: '/', component: Home }, // Home page showing article list
  { path: '/login', component: Login }, // User login page
  { path: '/register', component: Register }, // User registration page
  { path: '/article/:id', component: Article }, // Individual article view with comments
  { path: '/add-article', component: AddEditArticle }, // Add new article form
  { path: '/edit-article/:id', component: AddEditArticle }, // Edit existing article form
  { path: '/:pathMatch(.*)*', component: NotFound }, // 404 catch-all route
]

// Create and configure the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
