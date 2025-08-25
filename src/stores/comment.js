/**
 * Comment Store - Pinia store for managing article comments
 * Handles comment creation, editing, deletion, and retrieval by article
 */

import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [], // Array of all comments across all articles
  }),
  actions: {
    /**
     * Load comments from localStorage
     */
    loadComments() {
      const data = localStorage.getItem('comments')
      this.comments = data ? JSON.parse(data) : []
    },

    /**
     * Save comments array to localStorage
     */
    saveComments() {
      localStorage.setItem('comments', JSON.stringify(this.comments))
    },

    /**
     * Add a new comment to an article
     * @param {string} articleId - ID of the article being commented on
     * @param {string} content - Comment text content
     * @param {Object} user - User who is commenting
     */
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

    /**
     * Delete a comment (only by the comment author)
     * @param {string} articleId - ID of the article
     * @param {string} commentId - ID of the comment to delete
     * @param {Object} user - User attempting to delete (must be comment author)
     */
    deleteComment(articleId, commentId, user) {
      this.loadComments()
      this.comments = this.comments.filter(
        (c) => !(c.id === commentId && c.articleId === articleId && c.authorEmail === user.email),
      )
      this.saveComments()
    },

    /**
     * Edit an existing comment (only by the comment author)
     * @param {string} commentId - ID of the comment to edit
     * @param {string} newContent - New comment content
     * @param {Object} user - User attempting to edit (must be comment author)
     */
    editComment(commentId, newContent, user) {
      this.loadComments()
      const comment = this.comments.find((c) => c.id === commentId && c.authorEmail === user.email)
      if (comment) {
        comment.content = newContent
        this.saveComments()
      }
    },

    /**
     * Get all comments for a specific article
     * @param {string} articleId - ID of the article
     * @returns {Array} - Array of comment objects for the article
     */
    getCommentsByArticleId(articleId) {
      // Don't reload comments here to avoid reactive loops
      return this.comments.filter((c) => c.articleId === articleId)
    },
  },
})
