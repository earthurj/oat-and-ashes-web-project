import { db } from '@/firebase/config.js'
import { ref, push, update, remove, onValue, off, get, child } from 'firebase/database'

export default {
  namespaced: true,

  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null
  }),

  getters: {
    allProducts(state) {
      return state.products
    },
    productById(state) {
      return (id) => state.products.find(p => p.id === id)
    },
    productsByCategory(state) {
      return (category) => {
        if (!category || category === 'All') return state.products
        return state.products.filter(p => p.category === category)
      }
    },
    categories(state) {
      const cats = [...new Set(state.products.map(p => p.category))]
      return ['All', ...cats.sort()]
    },
    featuredProducts(state) {
      return state.products.slice(0, 4)
    }
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CURRENT(state, product) {
      state.currentProduct = product
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      const productsRef = ref(db, 'products')
      onValue(productsRef, (snapshot) => {
        const data = snapshot.val()
        const products = data
          ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
          : []
        commit('SET_PRODUCTS', products)
        commit('SET_LOADING', false)
      }, (error) => {
        commit('SET_ERROR', error.message)
        commit('SET_LOADING', false)
      })
    },

    async fetchProduct({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const snapshot = await get(child(ref(db), `products/${id}`))
        if (snapshot.exists()) {
          commit('SET_CURRENT', { id, ...snapshot.val() })
        } else {
          commit('SET_CURRENT', null)
        }
      } catch (err) {
        commit('SET_ERROR', err.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async addProduct({ commit }, productData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const productsRef = ref(db, 'products')
        await push(productsRef, productData)
      } catch (err) {
        commit('SET_ERROR', err.message)
        throw err
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateProduct({ commit }, { id, data }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const productRef = ref(db, `products/${id}`)
        await update(productRef, data)
        commit('SET_CURRENT', null)
      } catch (err) {
        commit('SET_ERROR', err.message)
        throw err
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteProduct({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const productRef = ref(db, `products/${id}`)
        await remove(productRef)
      } catch (err) {
        commit('SET_ERROR', err.message)
        throw err
      } finally {
        commit('SET_LOADING', false)
      }
    },

    cleanupListener() {
      const productsRef = ref(db, 'products')
      off(productsRef)
    }
  }
}
