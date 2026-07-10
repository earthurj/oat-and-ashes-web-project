import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductsView.vue')
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: () => import('@/views/AddProductView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetailView.vue')
  },
  {
    path: '/products/:id/edit',
    name: 'EditProduct',
    component: () => import('@/views/EditProductView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue')
  },
  {
    path: '/order-confirmation',
    name: 'OrderConfirmation',
    component: () => import('@/views/OrderConfirmationView.vue')
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/views/WishlistView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export function setupRouterGuards(router, store) {
  // Wait for auth to initialize before resolving any navigation
  router.beforeEach(async (to, from, next) => {
    // Wait for Firebase auth to initialize
    if (!store.state.auth.authReady) {
      await store.dispatch('auth/initAuth')
    }

    const isAuthenticated = store.getters['auth/isAuthenticated']

    // Protected routes — must be logged in
    if (to.meta.requiresAuth && !isAuthenticated) {
      return next({ name: 'Login', query: { redirect: to.fullPath } })
    }

    // Guest-only routes — redirect if already logged in
    if (to.meta.guestOnly && isAuthenticated) {
      return next({ name: 'Home' })
    }

    next()
  })
}

export default router
