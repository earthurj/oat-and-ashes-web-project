<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="mb-8">
      <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-2">Saved</span>
      <h1 class="font-display text-3xl font-bold uppercase tracking-[0.06em] text-espresso">Wishlist</h1>
    </div>

    <!-- Empty state -->
    <div v-if="wishlistItems.length === 0" class="card text-center py-16">
      <p class="font-mono text-xs uppercase tracking-wider text-espresso/40 mb-2">Nothing saved yet</p>
      <p class="font-display text-xs text-espresso/30 mb-6">Found something you like? Save it for later.</p>
      <router-link to="/products" class="btn-primary inline-block">Discover Products</router-link>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div
        v-for="item in wishlistItems"
        :key="item.id"
        class="card bg-cream flex flex-col group hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-block-hover transition-all duration-150"
      >
        <!-- Image -->
        <router-link :to="`/products/${item.id}`" class="block overflow-hidden mb-3 border-2 border-espresso/20">
          <img :src="item.image || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=80'" :alt="item.name" class="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-300" />
        </router-link>

        <span class="badge self-start mb-2">{{ item.category }}</span>
        <router-link :to="`/products/${item.id}`" class="font-display text-sm font-bold uppercase tracking-[0.04em] text-espresso hover:text-espresso/70 transition-colors mb-2">
          {{ item.name }}
        </router-link>
        <span class="font-display text-base font-bold text-espresso mt-auto mb-3">Rp {{ formatPrice(item.price) }}</span>

        <button @click="removeItem(item.id)" class="font-mono text-[9px] uppercase tracking-wider text-espresso/30 hover:text-red-800 transition-colors self-start">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const wishlistItems = computed(() => store.getters['wishlist/wishlistItems'])

function formatPrice(price) {
  return parseInt(price).toLocaleString('id-ID')
}

function removeItem(id) {
  store.dispatch('wishlist/removeFromWishlist', id)
}
</script>
