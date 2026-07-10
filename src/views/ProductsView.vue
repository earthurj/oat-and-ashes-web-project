<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
      <div>
        <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-2">The Collection</span>
        <h1 class="font-display text-3xl font-bold uppercase tracking-[0.06em] text-espresso">All Products</h1>
      </div>
      <router-link v-if="isAuthenticated" to="/products/add" class="btn-secondary text-center whitespace-nowrap">
        + Add Product
      </router-link>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-2 mb-8 pb-6 border-b-2 border-espresso/20">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="font-mono text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border-2 transition-all duration-150"
        :class="activeCategory === cat
          ? 'bg-espresso text-cream border-espresso'
          : 'border-espresso/30 text-espresso/60 hover:border-espresso hover:text-espresso'"
      >
        {{ cat }}
      </button>
    </div>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="filteredProducts.length === 0" class="card text-center py-16">
      <p class="font-mono text-xs uppercase tracking-wider text-espresso/40 mb-1">
        {{ activeCategory === 'All' ? 'The shelves are empty.' : `No ${activeCategory} products yet.` }}
      </p>
      <p class="font-display text-xs text-espresso/30">Check back soon.</p>
    </div>

    <!-- Product grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const store = useStore()
const activeCategory = ref('All')

const loading = computed(() => store.state.products.loading)
const allProducts = computed(() => store.getters['products/allProducts'])
const categories = computed(() => store.getters['products/categories'])
const filteredProducts = computed(() => store.getters['products/productsByCategory'](activeCategory.value))
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

onMounted(() => {
  store.dispatch('products/fetchProducts')
})
</script>
