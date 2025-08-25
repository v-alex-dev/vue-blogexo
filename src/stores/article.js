/**
 * Article Store - Pinia store for managing blog articles
 * Handles article creation, editing, retrieval, and persistence
 */

import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [], // Array of all blog articles
  }),
  actions: {
    /**
     * Load articles from localStorage or initialize with fake data
     */
    async loadArticles() {
      const data = localStorage.getItem('articles')
      if (data) {
        this.articles = JSON.parse(data)
      } else {
        // Load fake data if no localStorage data exists
        try {
          const response = await fetch('/fakeData.json')
          const fakeData = await response.json()
          this.articles = fakeData.articles || []
          this.saveArticles() // Save to localStorage for future use
        } catch (error) {
          console.error('Failed to load fake data:', error)
          this.articles = []
        }
      }
    },

    /**
     * Save articles array to localStorage
     */
    saveArticles() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    },

    /**
     * Create a new blog article
     * @param {string} title - Article title
     * @param {string} content - Article content/body
     * @param {Object} user - Author user object
     */
    addArticle(title, content, user) {
      // Don't reload articles here to avoid reactive loops
      const article = {
        id: Date.now().toString(),
        title,
        content,
        author: user.username,
        authorEmail: user.email,
        create_at: new Date().toLocaleDateString(
          'fr-FR',
          { timeZone: 'Europe/Paris' },
          'dd-MM-yyyy',
        ),
      }
      this.articles.unshift(article) // Add to beginning for newest first
      this.saveArticles()
    },

    /**
     * Edit an existing article (only by the author)
     * @param {string} id - Article ID
     * @param {string} title - New article title
     * @param {string} content - New article content
     * @param {Object} user - User attempting to edit (must be author)
     */
    editArticle(id, title, content, user) {
      // Don't reload articles here to avoid reactive loops
      const idx = this.articles.findIndex((a) => a.id === id && a.authorEmail === user.email)
      if (idx !== -1) {
        this.articles[idx].title = title
        this.articles[idx].content = content
        this.saveArticles()
      }
    },

    /**
     * Get a specific article by ID
     * @param {string} id - Article ID
     * @returns {Object|undefined} - Article object or undefined if not found
     */
    getArticleById(id) {
      // Don't reload articles here to avoid reactive loops
      return this.articles.find((a) => a.id === id)
    },
  },
})
