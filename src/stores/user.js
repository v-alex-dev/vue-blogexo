import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  actions: {
    loadUsers() {
      const data = localStorage.getItem('users')
      this.users = data ? JSON.parse(data) : []
    },
    saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users))
    },
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
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },
    loadCurrentUser() {
      const data = localStorage.getItem('currentUser')
      this.currentUser = data ? JSON.parse(data) : null
    },
  },
})
