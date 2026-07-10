<template>
  <div>
    <HeroBanner />

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-2">Fresh This Week</span>
          <h2 class="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.06em] text-espresso">Latest Roasts</h2>
        </div>
        <router-link to="/products" class="btn-ghost hidden sm:inline-block">View All →</router-link>
      </div>

      <LoadingSpinner v-if="loading" />

      <div v-else-if="products.length === 0" class="card text-center py-16">
        <p class="font-mono text-xs uppercase tracking-wider text-espresso/40 mb-2">No products yet</p>
        <router-link v-if="isAuthenticated" to="/products/add" class="font-display text-sm uppercase tracking-wider text-espresso underline underline-offset-2 hover:text-espresso/70">
          Add the first product
        </router-link>
        <p v-else class="font-display text-sm text-espresso/40">Check back soon — we're roasting.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>

      <div class="mt-6 text-center sm:hidden">
        <router-link to="/products" class="btn-ghost">View All →</router-link>
      </div>
    </section>

    <!-- Story section — adds personality -->
    <section class="border-t-2 border-espresso bg-cream">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div class="p-8 md:p-12 lg:p-16 border-b-2 md:border-b-0 md:border-r-2 border-espresso flex flex-col justify-center">
          <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 mb-3">Our Process</span>
          <h2 class="font-display text-2xl font-bold uppercase tracking-[0.06em] text-espresso mb-4">
            Roasted in Small Batches,<br />Shipped the Same Week
          </h2>
          <p class="text-sm text-espresso/70 leading-relaxed mb-6 max-w-md">
            Every bag of OAT &amp; ASHES is roasted in 5kg batches, cooled naturally,
            and packed within 24 hours. No stale beans. No shortcuts. Just coffee the
            way it should taste — alive, complex, and worth the wait.
          </p>
          <div class="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-espresso/50">
            <span>✓ Direct Trade</span>
            <span>✓ Small Batch</span>
            <span>✓ Fresh Roasted</span>
            <span>✓ Compostable Bags</span>
          </div>
        </div>
        <div class="min-h-[300px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
            alt="Coffee roasting process"
            class="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
          />
        </div>
      </div>
    </section>

    <!-- Newsletter / CTA -->
    <section class="max-w-7xl mx-auto px-4 py-16 text-center">
      <div class="card max-w-2xl mx-auto bg-cream">
        <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-3">Stay in the loop</span>
        <h3 class="font-display text-xl font-bold uppercase tracking-[0.06em] text-espresso mb-2">Never Miss a Roast</h3>
        <p class="text-sm text-espresso/60 mb-6">New origins drop every few weeks. We'll let you know what's fresh.</p>
        <div class="flex gap-0 max-w-sm mx-auto">
          <input type="email" placeholder="your@email.com" class="input-field rounded-r-none border-r-0 flex-1" />
          <button class="btn-primary rounded-l-none !shadow-none whitespace-nowrap">Subscribe</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import HeroBanner from '@/components/HeroBanner.vue'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const store = useStore()

const loading = computed(() => store.state.products.loading)
const products = computed(() => store.getters['products/allProducts'])
const featuredProducts = computed(() => store.getters['products/featuredProducts'])
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

onMounted(() => {
  store.dispatch('products/fetchProducts')
})
</script>
