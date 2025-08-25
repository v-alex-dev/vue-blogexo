import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [],
  }),
  actions: {
    loadComments() {
      const data = localStorage.getItem('comments')
      this.comments = data ? JSON.parse(data) : []
    },
    saveComments() {
      localStorage.setItem('comments', JSON.stringify(this.comments))
    },
    addComment(articleId, content, user) {
      this.loadComments()
      const comment = {
        id: Date.now().toString(),
        articleId,
        content,
        author: user.username,
        authorEmail: user.email,
      }
      this.comments.push(comment)
      this.saveComments()
    },
    deleteComment(articleId, commentId, user) {
      this.loadComments()
      this.comments = this.comments.filter(
        (c) => !(c.id === commentId && c.articleId === articleId && c.authorEmail === user.email),
      )
      this.saveComments()
    },
    editComment(commentId, newContent, user) {
      this.loadComments()
      const comment = this.comments.find((c) => c.id === commentId && c.authorEmail === user.email)
      if (comment) {
        comment.content = newContent
        this.saveComments()
      }
    },
    getCommentsByArticleId(articleId) {
      // Ne pas recharger les commentaires ici pour éviter les boucles réactives
      return this.comments.filter((c) => c.articleId === articleId)
    },
  },
})
