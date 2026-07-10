<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="!product" class="card text-center py-16">
      <p class="font-mono text-xs uppercase tracking-wider text-espresso/40">Product not found</p>
      <router-link to="/products" class="font-display text-sm uppercase tracking-wider text-espresso underline underline-offset-2 mt-2 inline-block">Back to Shop</router-link>
    </div>

    <template v-else>
      <!-- Back link -->
      <router-link to="/products" class="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-espresso/40 hover:text-espresso mb-8 transition-colors">
        ← Back to Shop
      </router-link>

      <!-- Product layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 border-2 border-espresso bg-cream">
        <!-- Image -->
        <div class="border-b-2 lg:border-b-0 lg:border-r-2 border-espresso overflow-hidden min-h-[350px]">
          <img
            :src="product.image || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80'"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Info -->
        <div class="p-6 sm:p-8 lg:p-10 flex flex-col">
          <!-- Badges -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span class="badge">{{ product.category }}</span>
            <span v-if="product.roast" class="badge">{{ product.roast }} Roast</span>
            <span v-if="product.origin" class="badge bg-transparent">{{ product.origin }}</span>
            <span v-if="product.type" class="badge bg-transparent">{{ product.type }}</span>
          </div>

          <h1 class="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.04em] text-espresso leading-tight mb-2">
            {{ product.name }}
          </h1>

          <!-- Price block -->
          <div class="flex items-baseline gap-3 mb-6">
            <span class="font-display text-3xl font-bold text-espresso">Rp {{ formatPrice(product.price) }}</span>
            <span v-if="product.weight" class="font-mono text-sm text-espresso/40">/ {{ product.weight }}</span>
          </div>

          <!-- Description -->
          <p class="text-sm text-espresso/70 leading-relaxed mb-8">
            {{ product.description }}
          </p>

          <!-- Specs table -->
          <div class="border-t-2 border-b-2 border-espresso/20 py-4 mb-8 grid grid-cols-2 gap-y-3 gap-x-4">
            <div v-if="product.origin">
              <span class="font-mono text-[10px] uppercase tracking-wider text-espresso/40 block">Origin</span>
              <span class="font-display text-sm uppercase tracking-wider text-espresso">{{ product.origin }}</span>
            </div>
            <div v-if="product.roast">
              <span class="font-mono text-[10px] uppercase tracking-wider text-espresso/40 block">Roast</span>
              <span class="font-display text-sm uppercase tracking-wider text-espresso">{{ product.roast }}</span>
            </div>
            <div v-if="product.type">
              <span class="font-mono text-[10px] uppercase tracking-wider text-espresso/40 block">Type</span>
              <span class="font-display text-sm uppercase tracking-wider text-espresso">{{ product.type }}</span>
            </div>
            <div v-if="product.weight">
              <span class="font-mono text-[10px] uppercase tracking-wider text-espresso/40 block">Weight</span>
              <span class="font-display text-sm uppercase tracking-wider text-espresso">{{ product.weight }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 mt-auto">
            <button @click="addToCart" class="btn-primary flex-1 text-center">
              Add to Cart — Rp {{ formatPrice(product.price) }}
            </button>
            <button @click="toggleWishlist" class="p-3 border-2 border-espresso hover:bg-tan/20 transition-colors duration-150" :class="{ 'bg-tan/40': isWishlisted }" :title="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-espresso"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>

          <!-- Admin actions -->
          <div v-if="isAuthenticated" class="flex gap-2 mt-4 pt-4 border-t border-espresso/10">
            <router-link :to="`/products/${product.id}/edit`" class="btn-ghost flex-1 text-center">Edit</router-link>
            <button @click="handleDelete" class="btn-ghost flex-1 text-center hover:bg-red-100 hover:border-red-800 hover:text-red-800">Delete</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const loading = computed(() => store.state.products.loading)
const product = computed(() => store.state.products.currentProduct)
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const isWishlisted = computed(() => product.value && store.getters['wishlist/isWishlisted'](product.value.id))

function formatPrice(price) {
  return parseInt(price).toLocaleString('id-ID')
}

function addToCart() {
  if (product.value) store.dispatch('cart/addToCart', product.value)
}

function toggleWishlist() {
  if (product.value) store.dispatch('wishlist/toggleWishlist', product.value)
}

async function handleDelete() {
  if (!product.value) return
  if (confirm(`Delete "${product.value.name}"? This can't be undone.`)) {
    await store.dispatch('products/deleteProduct', product.value.id)
    router.push('/products')
  }
}

onMounted(() => {
  store.dispatch('products/fetchProduct', route.params.id)
})

watch(() => route.params.id, (newId) => {
  store.dispatch('products/fetchProduct', newId)
})
</script>
