const WISH_KEY = 'oat_and_ashes_wishlist'

function loadWishlist() {
  try {
    const saved = localStorage.getItem(WISH_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveWishlist(items) {
  localStorage.setItem(WISH_KEY, JSON.stringify(items))
}

export default {
  namespaced: true,

  state: () => ({
    items: loadWishlist()
  }),

  getters: {
    wishlistItems(state) {
      return state.items
    },
    wishlistCount(state) {
      return state.items.length
    },
    isWishlisted(state) {
      return (productId) => state.items.some(item => item.id === productId)
    }
  },

  mutations: {
    TOGGLE_ITEM(state, product) {
      const index = state.items.findIndex(item => item.id === product.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        })
      }
      saveWishlist(state.items)
    },
    REMOVE_ITEM(state, productId) {
      state.items = state.items.filter(item => item.id !== productId)
      saveWishlist(state.items)
    }
  },

  actions: {
    toggleWishlist({ commit }, product) {
      commit('TOGGLE_ITEM', product)
    },
    removeFromWishlist({ commit }, productId) {
      commit('REMOVE_ITEM', productId)
    }
  }
}
