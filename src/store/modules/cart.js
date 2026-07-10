const CART_KEY = 'oat_and_ashes_cart'

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export default {
  namespaced: true,

  state: () => ({
    items: loadCart()
  }),

  getters: {
    cartItems(state) {
      return state.items
    },
    cartCount(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    cartSubtotal(state) {
      return state.items.reduce((sum, item) => {
        return sum + (parseInt(item.price) || 0) * item.quantity
      }, 0)
    },
    shippingTotal() {
      return 20000 // flat shipping in IDR
    },
    cartTotal(state, getters) {
      return getters.cartSubtotal + getters.shippingTotal
    },
    isInCart(state) {
      return (productId) => state.items.some(item => item.id === productId)
    }
  },

  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
      saveCart(items)
    },
    ADD_ITEM(state, product) {
      const existing = state.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          weight: product.weight,
          quantity: 1
        })
      }
      saveCart(state.items)
    },
    REMOVE_ITEM(state, productId) {
      state.items = state.items.filter(item => item.id !== productId)
      saveCart(state.items)
    },
    UPDATE_QTY(state, { productId, quantity }) {
      const item = state.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== productId)
        } else {
          item.quantity = quantity
        }
      }
      saveCart(state.items)
    },
    CLEAR_CART(state) {
      state.items = []
      saveCart([])
    }
  },

  actions: {
    addToCart({ commit }, product) {
      commit('ADD_ITEM', product)
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_ITEM', productId)
    },
    updateQuantity({ commit }, { productId, quantity }) {
      commit('UPDATE_QTY', { productId, quantity })
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    }
  }
}
