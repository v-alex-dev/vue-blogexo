/**
 * Main entry point for the Vue.js BlogExo application
 * Initializes the Vue app with Pinia state management and Vue Router
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Create the main Vue application instance
const app = createApp(App)

// Register Pinia for state management
app.use(createPinia())
// Register Vue Router for navigation
app.use(router)

// Mount the application to the DOM element with id 'app'
app.mount('#app')
