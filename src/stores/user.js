/**
 * User Store - Pinia store for managing user authentication and data
 * Handles user registration, login, logout, and current user state
 */

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [], // Array of all registered users
    currentUser: null, // Currently authenticated user object
  }),
  actions: {
    /**
     * Load users from localStorage
     */
    loadUsers() {
      const data = localStorage.getItem('users')
      this.users = data ? JSON.parse(data) : []
    },

    /**
     * Save users array to localStorage
     */
    saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    /**
     * Register a new user account
     * @param {string} username - User's display name
     * @param {string} email - User's email address (must be unique)
     * @param {string} password - User's password
     * @returns {boolean} - True if registration successful, false if email already exists
     */
    register(username, email, password) {
      this.loadUsers()
      if (this.users.find((u) => u.email === email)) return false
      const dateNow = new Date().toLocaleDateString(
        'fr-FR',
        { timeZone: 'Europe/Paris' },
        'dd-MM-yyyy',
      )
      const user = { username, email, password, created_at: dateNow }
      this.users.push(user)
      this.saveUsers()
      return true
    },

    /**
     * Authenticate user login
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {boolean} - True if login successful, false otherwise
     */
    login(email, password) {
      this.loadUsers()
      const user = this.users.find((u) => u.email === email && u.password === password)
      if (user) {
        this.currentUser = user
        localStorage.setItem('currentUser', JSON.stringify(user))
        return true
      }
      return false
    },

    /**
     * Log out the current user
     */
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },

    /**
     * Load current user from localStorage (for session persistence)
     */
    loadCurrentUser() {
      const data = localStorage.getItem('currentUser')
      this.currentUser = data ? JSON.parse(data) : null
    },
  },
})
