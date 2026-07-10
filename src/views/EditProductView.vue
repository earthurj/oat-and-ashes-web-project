<template>
  <div class="max-w-2xl mx-auto px-4 py-12">
    <router-link :to="`/products/${productId}`" class="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-espresso/40 hover:text-espresso mb-8 transition-colors">
      ← Back to Product
    </router-link>

    <div class="mb-8">
      <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-2">Edit</span>
      <h1 class="font-display text-3xl font-bold uppercase tracking-[0.06em] text-espresso">{{ product?.name || 'Loading...' }}</h1>
    </div>

    <LoadingSpinner v-if="loadingProduct" />

    <div v-else-if="error" class="card bg-[#FDF2F2] border-red-800 text-center py-12">
      <p class="font-mono text-xs uppercase tracking-wider text-red-800 mb-4">{{ error }}</p>
      <router-link to="/products" class="btn-ghost">Back to Shop</router-link>
    </div>

    <div v-else class="card bg-cream">
      <ProductForm :product="product" :saving="saving" @submit="handleUpdate" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import ProductForm from '@/components/ProductForm.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const productId = route.params.id
const loadingProduct = ref(true)

const product = computed(() => store.state.products.currentProduct)
const saving = computed(() => store.state.products.loading)
const error = computed(() => store.state.products.error)

onMounted(async () => {
  try {
    await store.dispatch('products/fetchProduct', productId)
  } catch {
    // Handled by store
  } finally {
    loadingProduct.value = false
  }
})

async function handleUpdate(formData) {
  try {
    await store.dispatch('products/updateProduct', { id: productId, data: formData })
    router.push(`/products/${productId}`)
  } catch {
    // Handled by store
  }
}
</script>
