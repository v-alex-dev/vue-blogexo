import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [],
  }),
  actions: {
    loadArticles() {
      const data = localStorage.getItem('articles')
      this.articles = data ? JSON.parse(data) : []
    },
    saveArticles() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    },
    addArticle(title, content, user) {
      // Ne pas recharger les articles ici pour éviter les boucles réactives
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
      this.articles.unshift(article)
      this.saveArticles()
    },
    editArticle(id, title, content, user) {
      // Ne pas recharger les articles ici pour éviter les boucles réactives
      const idx = this.articles.findIndex((a) => a.id === id && a.authorEmail === user.email)
      if (idx !== -1) {
        this.articles[idx].title = title
        this.articles[idx].content = content
        this.saveArticles()
      }
    },
    getArticleById(id) {
      // Ne pas recharger les articles ici pour éviter les boucles réactives
      return this.articles.find((a) => a.id === id)
    },
  },
})
