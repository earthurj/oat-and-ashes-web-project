<template>
  <nav class="sticky top-0 z-50 bg-cream border-b-2 border-espresso">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Brand -->
      <router-link to="/" class="flex items-center gap-3 group">
        <span class="font-display text-lg font-bold uppercase tracking-[0.15em] text-espresso leading-none">
          OAT<br class="hidden sm:block" />&amp; ASHES
        </span>
        <span class="hidden sm:inline-block w-px h-8 bg-espresso/30 mx-1"></span>
        <span class="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.2em] text-espresso/50 leading-tight max-w-[100px]">
          Specialty<br />Coffee &amp; Tea
        </span>
      </router-link>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-1">
        <router-link to="/" class="px-3 py-2 font-display text-xs uppercase tracking-wider text-espresso/70 hover:text-espresso hover:bg-tan/20 transition-colors">Home</router-link>
        <router-link to="/products" class="px-3 py-2 font-display text-xs uppercase tracking-wider text-espresso/70 hover:text-espresso hover:bg-tan/20 transition-colors">Shop</router-link>
        <router-link to="/wishlist" class="px-3 py-2 font-display text-xs uppercase tracking-wider text-espresso/70 hover:text-espresso hover:bg-tan/20 transition-colors flex items-center gap-1">
          Wishlist
          <span v-if="wishlistCount" class="font-mono text-[10px] bg-tan px-1.5 py-0.5 border border-espresso/40 leading-none">{{ wishlistCount }}</span>
        </router-link>
        <router-link v-if="isAuthenticated" to="/products/add" class="px-3 py-2 font-display text-xs uppercase tracking-wider text-espresso/70 hover:text-espresso hover:bg-tan/20 transition-colors">+ Add</router-link>
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-3">
        <!-- Wishlist (mobile) -->
        <router-link to="/wishlist" class="md:hidden relative p-1" title="Wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-espresso"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </router-link>

        <!-- Cart -->
        <router-link to="/cart" class="relative p-1" title="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-espresso"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span v-if="cartCount" class="absolute -top-1.5 -right-1.5 font-mono text-[10px] bg-espresso text-cream w-5 h-5 flex items-center justify-center shadow-block-sm leading-none">
            {{ cartCount }}
          </span>
        </router-link>

        <!-- Auth -->
        <template v-if="isAuthenticated">
          <span class="hidden sm:inline font-mono text-[11px] text-espresso/60 uppercase tracking-wider max-w-[100px] truncate">{{ userName }}</span>
          <button @click="handleLogout" class="font-display text-xs uppercase tracking-wider text-espresso/50 hover:text-espresso border-2 border-transparent hover:border-espresso px-2 py-1 transition-all duration-150">Out</button>
        </template>
        <template v-else>
          <router-link to="/login" class="font-display text-xs uppercase tracking-wider text-espresso/70 hover:text-espresso border-2 border-transparent hover:border-espresso px-2 py-1 transition-all duration-150">In</router-link>
          <router-link to="/register" class="hidden sm:block font-display text-xs uppercase tracking-wider bg-espresso text-cream px-3 py-1.5 border-2 border-espresso shadow-block-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-150">Join</router-link>
        </template>

        <!-- Mobile menu toggle -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-1 border-2 border-transparent hover:border-espresso transition-all duration-150">
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-espresso">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-espresso">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="md:hidden border-t-2 border-espresso bg-cream">
      <div class="px-4 py-3 space-y-1">
        <router-link @click="mobileOpen = false" to="/" class="block px-3 py-2 font-display text-sm uppercase tracking-wider text-espresso/70 hover:text-espresso hover:bg-tan/20">Home</router-link>
        <router-link @click="mobileOpen = false" to="/products" class="block px-3 py-2 font-display text-sm uppercase tracking-wider text-espresso/70 hover:text-espresso hover:bg-tan/20">Shop</router-link>
        <router-link @click="mobileOpen = false" to="/wishlist" class="block px-3 py-2 font-display text-sm uppercase tracking-wider text-espresso/70 hover:text-espresso hover:bg-tan/20">Wishlist</router-link>
        <router-link v-if="isAuthenticated" @click="mobileOpen = false" to="/products/add" class="block px-3 py-2 font-display text-sm uppercase tracking-wider text-espresso/70 hover:text-espresso hover:bg-tan/20">+ Add Product</router-link>
        <div class="divider my-2"></div>
        <router-link v-if="!isAuthenticated" @click="mobileOpen = false" to="/register" class="block px-3 py-2 font-display text-sm uppercase tracking-wider bg-espresso text-cream text-center border-2 border-espresso shadow-block-sm">Join</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const mobileOpen = ref(false)

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const userName = computed(() => store.getters['auth/userName'])
const cartCount = computed(() => store.getters['cart/cartCount'])
const wishlistCount = computed(() => store.getters['wishlist/wishlistCount'])

async function handleLogout() {
  await store.dispatch('auth/logout')
  mobileOpen.value = false
  router.push('/')
}
</script>
