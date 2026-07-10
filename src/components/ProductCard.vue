<template>
  <div class="card group flex flex-col bg-cream hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-block-hover transition-all duration-150">
    <!-- Image -->
    <router-link :to="`/products/${product.id}`" class="block overflow-hidden mb-4 border-2 border-espresso/20">
      <img
        :src="product.image || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=80'"
        :alt="product.name"
        class="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-300"
      />
    </router-link>

    <!-- Meta badges -->
    <div class="flex flex-wrap gap-1.5 mb-3">
      <span class="badge">{{ product.category }}</span>
      <span v-if="product.roast" class="badge">{{ product.roast }} Roast</span>
      <span v-if="product.origin" class="badge bg-transparent">{{ product.origin }}</span>
    </div>

    <!-- Name + price -->
    <router-link :to="`/products/${product.id}`" class="block mb-3">
      <h3 class="font-display text-base font-bold uppercase tracking-[0.04em] text-espresso leading-tight group-hover:text-espresso/80 transition-colors">
        {{ product.name }}
      </h3>
    </router-link>

    <p class="text-xs text-espresso/50 font-body leading-relaxed mb-4 line-clamp-2 flex-1">
      {{ product.description }}
    </p>

    <!-- Price + weight -->
    <div class="flex items-end justify-between mt-auto pt-3 border-t border-espresso/10">
      <div>
        <span class="font-display text-lg font-bold text-espresso">Rp {{ formatPrice(product.price) }}</span>
        <span v-if="product.weight" class="font-mono text-[10px] text-espresso/40 ml-1">/ {{ product.weight }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 mt-3">
      <button @click="addToCart" class="flex-1 btn-primary text-center text-xs !py-2 !px-3">
        Add to Cart
      </button>
      <button @click="toggleWishlist" class="p-2 border-2 border-espresso hover:bg-tan/20 transition-colors duration-150" :class="{ 'bg-tan/40': isWishlisted }" :title="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-espresso"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <!-- Edit/Delete for authed users -->
      <template v-if="isAuthenticated">
        <router-link :to="`/products/${product.id}/edit`" class="p-2 border-2 border-espresso hover:bg-tan/20 transition-colors duration-150" title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-espresso"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </router-link>
        <button @click="handleDelete" class="p-2 border-2 border-espresso hover:bg-red-100 transition-colors duration-150" title="Delete">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-espresso"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  product: { type: Object, required: true }
})

const store = useStore()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const isWishlisted = computed(() => store.getters['wishlist/isWishlisted'](props.product.id))

function formatPrice(price) {
  return parseInt(price).toLocaleString('id-ID')
}

function addToCart() {
  store.dispatch('cart/addToCart', props.product)
}

function toggleWishlist() {
  store.dispatch('wishlist/toggleWishlist', props.product)
}

function handleDelete() {
  if (confirm(`Delete "${props.product.name}"? This can't be undone.`)) {
    store.dispatch('products/deleteProduct', props.product.id)
  }
}
</script>
