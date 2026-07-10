import { createStore } from 'vuex'
import auth from './modules/auth.js'
import products from './modules/products.js'
import cart from './modules/cart.js'
import wishlist from './modules/wishlist.js'

export default createStore({
  modules: {
    auth,
    products,
    cart,
    wishlist
  }
})
