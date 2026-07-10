import { auth, db } from '@/firebase/config.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { ref, set } from 'firebase/database'

export default {
  namespaced: true,

  state: () => ({
    user: null,
    authReady: false,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated(state) {
      return !!state.user
    },
    currentUser(state) {
      return state.user
    },
    userName(state) {
      return state.user?.displayName || state.user?.email || ''
    }
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.authReady = true
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_USER(state) {
      state.user = null
    }
  },

  actions: {
    async register({ commit }, { name, email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(cred.user, { displayName: name })
        // Save user profile to Realtime Database
        await set(ref(db, `users/${cred.user.uid}`), {
          name,
          email,
          createdAt: new Date().toISOString()
        })
        commit('SET_USER', { ...cred.user, displayName: name })
      } catch (err) {
        commit('SET_ERROR', err.message)
        throw err
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async login({ commit }, { email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        commit('SET_USER', cred.user)
      } catch (err) {
        commit('SET_ERROR', err.message)
        throw err
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async logout({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
    },

    initAuth({ commit }) {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          commit('SET_USER', user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null)
          resolve(user)
        })
      })
    }
  }
}
